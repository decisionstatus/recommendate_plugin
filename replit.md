# Product Recommendations - Shopify App

## Overview
A comprehensive Shopify app for AI-powered product recommendations built with Shopify Polaris React framework. The app provides merchants with advanced tools to configure recommendation algorithms, merchandising rules, and analytics to boost sales through intelligent product suggestions.

## Recent Changes
- **October 29, 2025**: Initial application scaffolding with complete frontend implementation
  - Implemented all data schemas for stores, products, recommendation configs, merchandising rules, and analytics
  - Built comprehensive Polaris-based UI with navigation, dashboard, use cases, products, merchandising, and analytics pages
  - Created reusable components: KPICard, UseCaseCard, ProductTable, RuleBuilder, AIConfigForm, Navigation
  - Integrated Recharts for analytics visualization
  - Configured Shopify Polaris design system with Inter font and professional styling

## Project Architecture

### Frontend Stack
- **Framework**: React with Wouter for routing
- **UI Library**: Shopify Polaris (@shopify/polaris)
- **State Management**: TanStack Query (React Query) for server state
- **Charts**: Recharts for analytics visualization
- **Styling**: Shopify Polaris CSS + Tailwind CSS for custom utilities
- **Type Safety**: TypeScript with Zod for runtime validation

### Backend Stack
- **Server**: Express.js (proxy layer)
- **External API**: Python FastAPI backend at https://api.smartcalc.in
- **Storage**: All data persisted in external Python backend (stores, products, configs, rules, analytics)

### Data Model
- **Stores**: Shopify store information and authentication
- **Products**: Synced product catalog with variants, pricing, inventory
- **Recommendation Configs**: Use cases with AI config, merchandising rules, manual products
- **Merchandising Rules**: Pin, boost, bury, whitelist, blacklist, inventory-based, time-based, price-range, tag-based rules
- **Analytics**: Metrics (impressions, clicks, conversions, CTR, revenue, AOV, ROI), trends, performance by type

## User Preferences
- Professional, data-dense UI following Shopify Polaris design patterns
- Real-time sync status updates with progress indicators
- Comprehensive configuration options for recommendation algorithms
- Advanced merchandising rules with global and use-case-specific scopes
- Analytics dashboard with interactive charts and KPI cards

## Key Features

### 1. Dashboard
- Overview of key performance metrics (Revenue, AOV, Conversion Rate, CTR)
- Trend charts showing performance over time
- Performance comparison by recommendation type
- Quick access to all sections via navigation

### 2. Use Cases Management
- Create and configure multiple recommendation use cases
- Six recommendation types: Similar Products, Bought Together, Cross-sell, Upsell, Personalized, Trending
- Five placement options: Product Page, Cart Page, Home Page, Collection Page, Checkout Page
- Enable/disable toggle for each use case
- Edit configuration with AI settings, merchandising rules, and manual product selection

### 3. AI Configuration
- Algorithm selection: Collaborative Filtering, Content-Based, Hybrid, Popularity-Based, Deep Learning
- Adjustable parameters:
  - Confidence Threshold (0-100%)
  - Max Results (1-50 products)
  - Diversity Factor (0-100%)
  - Personalization Weight (0-100%)
  - Recency Weight (0-100%)

### 4. Merchandising Rules
- **Rule Types**:
  - Pin: Force specific products to top positions
  - Boost: Increase ranking of certain products
  - Bury: Decrease ranking of certain products
  - Whitelist: Include only specific products
  - Blacklist: Exclude specific products
  - Inventory-Based: Filter by stock levels
  - Time-Based: Apply rules during specific date ranges
  - Price Range: Filter by price brackets
  - Tag-Based: Filter by product tags
- **Rule Scopes**: Global (apply to all use cases) or use-case-specific
- **Priority Management**: Numeric priority for rule ordering

### 5. Product Sync
- Sync products from Shopify to backend
- Real-time progress indicators during sync
- Product table with search and filter capabilities
- Sync status and history tracking
- Batch processing support (up to 250 products per batch)

### 6. Analytics Dashboard
- Date range selection (7, 30, 90, 365 days)
- KPI metrics with trend indicators
- Line charts for conversion trends over time
- Bar charts for revenue by recommendation type
- Engagement metrics (impressions, clicks, CTR, conversions)

## File Structure
```
client/
├── src/
│   ├── components/
│   │   ├── PolarisProvider.tsx      # Polaris app wrapper
│   │   ├── Navigation.tsx            # Sidebar navigation
│   │   ├── KPICard.tsx              # Metric display card
│   │   ├── UseCaseCard.tsx          # Use case summary card
│   │   ├── ProductTable.tsx         # Product listing table
│   │   ├── RuleBuilder.tsx          # Merchandising rules builder
│   │   └── AIConfigForm.tsx         # AI algorithm configuration
│   ├── pages/
│   │   ├── Dashboard.tsx            # Main analytics overview
│   │   ├── UseCases.tsx             # Use case listing
│   │   ├── UseCaseConfig.tsx        # Use case configuration
│   │   ├── Products.tsx             # Product sync and listing
│   │   ├── Merchandising.tsx        # Global merchandising rules
│   │   └── Analytics.tsx            # Detailed analytics
│   ├── App.tsx                      # Main app with routing
│   └── index.css                    # Global styles (Polaris + custom)
shared/
└── schema.ts                        # Shared TypeScript types and Zod schemas
server/
├── routes.ts                        # API proxy routes
└── storage.ts                       # Storage interface
```

## API Integration
All API calls are proxied through Express backend to Python FastAPI at https://api.smartcalc.in

### Endpoints Used:
- **Stores**: GET/POST/PUT/DELETE `/api/v1/stores`
- **Products**: GET/POST `/api/v1/stores/:id/products`, POST `/api/v1/stores/:id/products/sync`
- **Catalog Info**: GET `/api/v1/stores/:id/products/info`
- **Recommendation Configs**: GET/POST/PUT/DELETE `/api/v1/stores/:id/reco-configs`
- **Merchandising Rules**: Custom endpoints for global rules management
- **Analytics**: Custom endpoints for metrics, trends, and performance data

## Development Workflow
1. Start application: `npm run dev` (runs Express + Vite)
2. Frontend binds to 0.0.0.0:5000
3. Backend proxies requests to https://api.smartcalc.in
4. All state managed through React Query with automatic cache invalidation

## Design System
- **Colors**: Shopify Polaris palette with teal primary color (#008060)
- **Typography**: Inter font family for all text
- **Spacing**: Polaris spacing tokens (8px base unit)
- **Components**: Full Polaris component library
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
