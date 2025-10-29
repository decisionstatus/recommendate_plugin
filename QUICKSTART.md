# Quick Start Guide

Get the Shopify Product Recommendations Plugin up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Node.js

Make sure you have Node.js 18 or higher installed:

```bash
node --version
```

If you don't have Node.js, download it from [nodejs.org](https://nodejs.org/)

### 2. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/decisionstatus/recommendate_plugin.git
cd recommendate_plugin

# Run the setup script (automated)
npm run setup
```

Or manually:

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Build the project
npm run build
```

### 3. Start the Application

```bash
npm run dev
```

The application will be available at: **http://localhost:5000**

## 📱 First Steps

### 1. View the Dashboard

Open your browser and navigate to:
```
http://localhost:5000
```

You'll see the main dashboard with analytics overview.

### 2. Sync Products (Optional)

If you have the backend running:
1. Click **Products** in the sidebar
2. Click **Sync Products**
3. Wait for sync to complete

### 3. Create Your First Use Case

1. Click **Use Cases** in the sidebar
2. Click **Create Use Case**
3. Fill in the details:
   - **Name**: "Similar Products"
   - **Type**: Similar Products
   - **Placement**: Product Page
4. Configure AI settings (optional)
5. Click **Save**
6. Toggle **Enable** to activate

### 4. Configure Merchandising Rules (Optional)

1. Click **Merchandising** in the sidebar
2. Click **Add Rule**
3. Choose rule type:
   - **Pin**: Force products to top
   - **Boost**: Increase ranking
   - **Bury**: Decrease ranking
4. Set priority and products
5. Click **Save**

### 5. View Analytics

1. Click **Analytics** in the sidebar
2. Select date range
3. View metrics:
   - Total impressions and clicks
   - Conversion rate
   - Revenue attributed
   - ROI

## 🔧 Configuration

### Environment Variables

Edit `.env` to configure:

```env
# Backend API URL
API_BASE_URL=https://api.smartcalc.in/api/v1

# Store ID for development
DEFAULT_STORE_ID=dev-store-1

# Server port
PORT=5000
```

### Backend Options

**Option 1: Use Hosted Backend (Easiest)**
- Already configured in `.env.example`
- No additional setup needed

**Option 2: Run Backend Locally**
1. Clone backend: `git clone https://github.com/decisionstatus/recommendate_backend.git`
2. Follow backend setup in its README
3. Update `API_BASE_URL=http://localhost:8000/api/v1`

## 🎯 Common Use Cases

### E-commerce Store with Multiple Products

1. **Sync Product Catalog**
   - Go to Products → Sync Products

2. **Create Use Cases**
   - Similar Products (Product Page)
   - Frequently Bought Together (Cart Page)
   - Upsell (Checkout Page)
   - Personalized (Home Page)

3. **Add Merchandising Rules**
   - Pin bestsellers
   - Boost high-margin products
   - Bury out-of-stock items

4. **Monitor Performance**
   - Check Analytics daily
   - Adjust rules based on data
   - A/B test different algorithms

### Fashion Store

1. **Use Cases**
   - Cross-sell accessories with clothing
   - Similar styles on product pages
   - Trending items on home page

2. **Rules**
   - Pin seasonal collections
   - Boost new arrivals
   - Filter by size availability

### Electronics Store

1. **Use Cases**
   - Frequently bought together (accessories)
   - Upsell (higher-spec models)
   - Similar products (alternatives)

2. **Rules**
   - Boost compatible accessories
   - Filter by price range
   - Pin warranty/protection plans

## 📊 Understanding the Interface

### Navigation

- **Dashboard** - Overview and key metrics
- **Use Cases** - Manage recommendation configs
- **Products** - Sync and view product catalog
- **Merchandising** - Global rules management
- **Analytics** - Detailed performance data

### Use Case Configuration

**AI Config Tab**
- Choose algorithm (Collaborative, Content-Based, etc.)
- Adjust confidence threshold
- Set max results
- Fine-tune diversity, personalization, recency

**Merchandising Rules Tab**
- Create use-case-specific rules
- Set priorities
- Define conditions

**Manual Products Tab**
- Manually select products
- Drag to reorder
- Preview selections

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3000
```

### Backend Connection Failed

- Check `API_BASE_URL` in `.env`
- Verify backend is running
- Check network/firewall

### Build Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### TypeScript Errors

```bash
# Run type check
npm run check
```

## 🚀 Next Steps

1. **Read the Full Documentation**
   - [README.md](./README.md) - Complete documentation
   - [API.md](./API.md) - API reference
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide

2. **Integrate with Shopify**
   - Set up Shopify app credentials
   - Configure OAuth
   - Deploy to production

3. **Customize**
   - Modify UI components
   - Add custom analytics
   - Extend API endpoints

4. **Optimize**
   - A/B test algorithms
   - Fine-tune merchandising rules
   - Monitor and iterate

## 📚 Resources

- [Shopify Polaris](https://polaris.shopify.com/) - UI framework
- [Backend Repository](https://github.com/decisionstatus/recommendate_backend)
- [FastAPI Docs](https://fastapi.tiangolo.com/)

## 💬 Get Help

- **Issues**: [GitHub Issues](https://github.com/decisionstatus/recommendate_plugin/issues)
- **Documentation**: Check README.md
- **Contributing**: See CONTRIBUTING.md

---

**Ready to boost your sales with AI-powered recommendations?** 🚀

Start by creating your first use case and watch the conversions roll in!
