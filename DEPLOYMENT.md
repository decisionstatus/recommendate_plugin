# Deployment Guide

This guide covers deploying the Shopify Product Recommendations Plugin to production.

## 📋 Pre-Deployment Checklist

- [ ] Backend API is running and accessible
- [ ] Environment variables are configured
- [ ] Application builds successfully
- [ ] TypeScript compilation passes
- [ ] API endpoints are tested
- [ ] SSL certificate is configured (for HTTPS)
- [ ] Domain name is configured

## 🚀 Deployment Options

### Option 1: Traditional VPS/Server

#### Requirements
- Node.js 18+ installed
- Process manager (PM2 recommended)
- Nginx or Apache for reverse proxy
- SSL certificate (Let's Encrypt recommended)

#### Steps

1. **Clone the repository on your server:**
```bash
git clone https://github.com/decisionstatus/recommendate_plugin.git
cd recommendate_plugin
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
nano .env
```

Update the following:
```env
NODE_ENV=production
PORT=5000
API_BASE_URL=https://api.smartcalc.in/api/v1
DEFAULT_STORE_ID=your-production-store-id
```

4. **Build the application:**
```bash
npm run build
```

5. **Install PM2 (if not already installed):**
```bash
npm install -g pm2
```

6. **Start the application with PM2:**
```bash
pm2 start dist/index.js --name recommendate-plugin
pm2 save
pm2 startup
```

7. **Configure Nginx as reverse proxy:**

Create `/etc/nginx/sites-available/recommendate-plugin`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/recommendate-plugin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

9. **Monitor the application:**
```bash
pm2 logs recommendate-plugin
pm2 monit
```

### Option 2: Docker Deployment

#### Create Dockerfile

Create `Dockerfile` in the project root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - API_BASE_URL=https://api.smartcalc.in/api/v1
      - DEFAULT_STORE_ID=your-store-id
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
```

#### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

### Option 3: Platform as a Service (PaaS)

#### Heroku

1. **Install Heroku CLI:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login and create app:**
```bash
heroku login
heroku create your-app-name
```

3. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set API_BASE_URL=https://api.smartcalc.in/api/v1
heroku config:set DEFAULT_STORE_ID=your-store-id
```

4. **Create Procfile:**
```
web: npm start
```

5. **Deploy:**
```bash
git push heroku main
```

6. **View logs:**
```bash
heroku logs --tail
```

#### Railway

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and initialize:**
```bash
railway login
railway init
```

3. **Set environment variables:**
```bash
railway variables set NODE_ENV=production
railway variables set API_BASE_URL=https://api.smartcalc.in/api/v1
railway variables set DEFAULT_STORE_ID=your-store-id
```

4. **Deploy:**
```bash
railway up
```

#### Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Add all required variables

#### Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Configure vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

3. **Deploy:**
```bash
vercel
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` to version control
- Use secure random strings for secrets
- Rotate secrets regularly

### SSL/TLS
- Always use HTTPS in production
- Configure proper SSL certificates
- Use modern TLS versions (1.2+)

### API Security
- Implement rate limiting
- Use API keys for backend authentication
- Validate and sanitize all inputs
- Implement CORS properly

### Application Security
- Keep dependencies up to date
- Run security audits: `npm audit`
- Use security headers (helmet.js)
- Implement proper error handling

## 📊 Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Application Logs
Configure logging in production:
```javascript
// server/index.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Checks
Add a health check endpoint:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
```

### Uptime Monitoring
Use services like:
- UptimeRobot
- Pingdom
- StatusCake
- Better Uptime

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run check
        
      - name: Build
        run: npm run build
        
      - name: Deploy to server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          ARGS: "-rltgoDzvO --delete"
          SOURCE: "dist/"
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: ${{ secrets.REMOTE_TARGET }}
          
      - name: Restart application
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ${{ secrets.REMOTE_TARGET }}
            pm2 restart recommendate-plugin
```

## 🔧 Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

### Port Already in Use
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

### Application Won't Start
```bash
# Check logs
pm2 logs recommendate-plugin

# Check environment variables
pm2 env recommendate-plugin

# Restart
pm2 restart recommendate-plugin
```

### High Memory Usage
```bash
# Check memory
pm2 monit

# Set memory limit
pm2 start dist/index.js --name recommendate-plugin --max-memory-restart 500M
```

## 📈 Performance Optimization

### Caching
- Implement Redis for caching
- Cache API responses
- Use CDN for static assets

### Load Balancing
- Use multiple instances with PM2:
```bash
pm2 start dist/index.js -i max --name recommendate-plugin
```

### Database Connection Pooling
- Configure proper connection pools
- Monitor connection usage

### Compression
- Enable Gzip compression in Nginx or Express

## 🔄 Updates and Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart
pm2 restart recommendate-plugin
```

### Backup Strategy
- Regular database backups
- Configuration file backups
- Store backups offsite

### Maintenance Windows
- Schedule maintenance during low-traffic periods
- Notify users of planned downtime
- Have a rollback plan

## 📞 Support

For deployment issues:
1. Check the logs: `pm2 logs`
2. Review this documentation
3. Open a GitHub issue
4. Contact the development team

## ✅ Post-Deployment Checklist

- [ ] Application is running and accessible
- [ ] SSL certificate is valid
- [ ] Environment variables are set correctly
- [ ] Health check endpoint responds
- [ ] Logs are being written
- [ ] Monitoring is configured
- [ ] Backups are configured
- [ ] CI/CD pipeline is working (if applicable)
- [ ] Performance is acceptable
- [ ] Security scan completed
