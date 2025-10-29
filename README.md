# Shopify Product Recommendations Plugin

An end-to-end Shopify product recommendation plugin with AI-powered recommendations, built with React (Shopify Polaris) frontend and FastAPI backend integration.

## 🚀 Features

- **AI-Powered Recommendations**: Multiple algorithms including Collaborative Filtering, Content-Based, Hybrid, and Deep Learning
- **Flexible Use Cases**: Similar Products, Frequently Bought Together, Cross-sell, Upsell, Personalized, and Trending recommendations
- **Advanced Merchandising Rules**: Pin, boost, bury, whitelist, blacklist products with global and use-case-specific rules
- **Product Sync**: Seamless integration with Shopify product catalog
- **Analytics Dashboard**: Real-time metrics including CTR, conversion rates, revenue attribution, and ROI
- **Multiple Placements**: Product Page, Cart Page, Home Page, Collection Page, and Checkout Page

## 📋 Prerequisites

- Node.js 18+ and npm
- Access to a Shopify store (for production use)
- Backend API running (see [Backend Setup](#backend-setup))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/decisionstatus/recommendate_plugin.git
cd recommendate_plugin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure the following variables:

```env
# Backend API Configuration
API_BASE_URL=https://api.smartcalc.in/api/v1

# Default store ID for development
DEFAULT_STORE_ID=dev-store-1

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Backend Setup

This plugin requires the FastAPI backend from the [recommendate_backend](https://github.com/decisionstatus/recommendate_backend) repository.

### Option 1: Use Hosted Backend

The plugin is pre-configured to use the hosted backend at `https://api.smartcalc.in/api/v1`. No additional setup is required for development.

### Option 2: Run Backend Locally

1. Clone the backend repository:
```bash
git clone https://github.com/decisionstatus/recommendate_backend.git
cd recommendate_backend
```

2. Follow the backend setup instructions in its README

3. Update your `.env` file to point to the local backend:
```env
API_BASE_URL=http://localhost:8000/api/v1
```

## 📦 Build for Production

```bash
npm run build
```

This will:
- Build the frontend assets using Vite
- Bundle the Express server
- Output everything to the `dist/` directory

## 🚀 Deploy

### Start Production Server

```bash
npm start
```

The server will run on the port specified in the `PORT` environment variable (default: 5000).

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
API_BASE_URL=https://api.smartcalc.in/api/v1
DEFAULT_STORE_ID=your-store-id
```

## 📁 Project Structure

```
recommendate_plugin/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
├── server/                # Express backend (API proxy)
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── vite.ts           # Vite dev server setup
├── shared/               # Shared TypeScript types and schemas
│   └── schema.ts         # Zod schemas and TypeScript types
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎯 Usage Guide

### 1. Dashboard

The main dashboard displays:
- Key performance metrics (Revenue, CTR, Conversion Rate, AOV)
- Trend charts showing performance over time
- Recommendation performance by type

### 2. Creating Use Cases

1. Navigate to **Use Cases** from the sidebar
2. Click **Create Use Case**
3. Configure:
   - Name and description
   - Recommendation type (Similar, Bought Together, etc.)
   - Placement (Product Page, Cart, etc.)
   - AI algorithm and parameters
   - Merchandising rules (optional)
   - Manual product selection (optional)
4. Click **Save** and **Enable**

### 3. Product Sync

1. Navigate to **Products** from the sidebar
2. Click **Sync Products** to import your Shopify catalog
3. Monitor sync progress in real-time
4. View synced products in the table

### 4. Merchandising Rules

Create rules to fine-tune recommendations:

- **Pin**: Force specific products to top positions
- **Boost**: Increase ranking of products
- **Bury**: Decrease ranking of products
- **Whitelist**: Include only specific products
- **Blacklist**: Exclude specific products
- **Inventory-Based**: Filter by stock levels
- **Time-Based**: Apply rules during date ranges
- **Price Range**: Filter by price brackets
- **Tag-Based**: Filter by product tags

Rules can be:
- **Global**: Apply to all use cases
- **Use-case-specific**: Apply to individual use cases

### 5. Analytics

View detailed analytics:
- Date range selection (7, 30, 90, 365 days)
- Engagement metrics (impressions, clicks)
- Conversion metrics (CTR, conversion rate)
- Revenue metrics (attributed revenue, AOV, ROI)
- Performance comparison by recommendation type

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Type check without building
npm run check

# Build for production
npm run build

# Start production server
npm start

# Push database schema changes (if using database)
npm run db:push
```

### Technology Stack

**Frontend:**
- React 18
- Shopify Polaris UI Framework
- TanStack Query (React Query) for state management
- Wouter for routing
- Recharts for data visualization
- TypeScript for type safety
- Vite for fast development and building

**Backend:**
- Express.js (proxy layer)
- FastAPI (external backend)
- Axios for HTTP requests
- TypeScript

**Data Validation:**
- Zod schemas for runtime type validation

## 🔐 API Integration

The Express server acts as a proxy to the FastAPI backend. All API requests are forwarded to the backend at `API_BASE_URL`.

### Key API Endpoints

```
GET    /api/stores                           # List stores
GET    /api/stores/:id                       # Get store details
GET    /api/products                         # List products
POST   /api/products/sync                    # Sync products from Shopify
GET    /api/products/info                    # Get catalog info
GET    /api/reco-configs                     # List recommendation configs
POST   /api/reco-configs                     # Create config
PUT    /api/reco-configs/:id                 # Update config
DELETE /api/reco-configs/:id                 # Delete config
GET    /api/merchandising-rules/global       # Get global rules
POST   /api/merchandising-rules/global       # Update global rules
GET    /api/analytics/metrics                # Get analytics metrics
GET    /api/analytics/trends                 # Get trend data
GET    /api/analytics/performance            # Get performance by type
```

## 🧪 Testing

```bash
# Run type checking
npm run check
```

## 🐛 Troubleshooting

### Backend Connection Issues

If you see errors about backend connection:
1. Check that `API_BASE_URL` in `.env` is correct
2. Verify the backend is running and accessible
3. Check network/firewall settings

### Build Errors

If build fails:
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Run type check: `npm run check`

### Port Already in Use

If port 5000 is already in use:
1. Change the `PORT` in `.env`
2. Or kill the process using port 5000:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

## 📚 Additional Documentation

- [Design Guidelines](./design_guidelines.md) - UI/UX design system and patterns
- [Backend Repository](https://github.com/decisionstatus/recommendate_backend) - FastAPI backend source code
- [Backend API Docs](https://api.smartcalc.in/docs) - OpenAPI documentation

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Shopify Polaris](https://polaris.shopify.com/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Icons from [Shopify Polaris Icons](https://polaris.shopify.com/icons)

## 📧 Support

For support, please:
1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue on GitHub
3. Contact the development team

---

Made with ❤️ for Shopify merchants
