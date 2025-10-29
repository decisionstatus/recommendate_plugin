# API Documentation

This document describes the API endpoints available in the Shopify Product Recommendations Plugin.

## Base URL

All API requests are proxied through the Express server to the FastAPI backend.

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`
- **Backend**: `https://api.smartcalc.in/api/v1` (configurable via `API_BASE_URL`)

## Authentication

Currently, the API uses a default store ID for development. In production, authentication would be handled through Shopify OAuth.

## Endpoints

### Stores

#### List All Stores

```http
GET /api/stores
```

**Response:**
```json
[
  {
    "id": "store-123",
    "name": "My Store",
    "shopify_domain": "mystore.myshopify.com",
    "created_at": "2025-10-29T00:00:00Z"
  }
]
```

#### Get Store Details

```http
GET /api/stores/:id
```

**Parameters:**
- `id` (path) - Store ID

**Response:**
```json
{
  "id": "store-123",
  "name": "My Store",
  "shopify_domain": "mystore.myshopify.com",
  "created_at": "2025-10-29T00:00:00Z",
  "settings": {
    "timezone": "UTC",
    "currency": "USD"
  }
}
```

### Products

#### List Products

```http
GET /api/products
```

**Response:**
```json
[
  {
    "id": "prod-123",
    "shopify_product_id": "1234567890",
    "title": "Premium T-Shirt",
    "description": "High quality cotton t-shirt",
    "price": 29.99,
    "compare_at_price": 39.99,
    "vendor": "My Brand",
    "product_type": "Apparel",
    "tags": ["shirt", "cotton", "premium"],
    "image_url": "https://cdn.shopify.com/...",
    "inventory_quantity": 100,
    "variants": [
      {
        "id": "var-123",
        "title": "Small / Blue",
        "price": 29.99,
        "inventory_quantity": 25
      }
    ]
  }
]
```

#### Get Catalog Info

```http
GET /api/products/info
```

**Response:**
```json
{
  "product_count": 150,
  "batch_count": 6,
  "last_sync_at": "2025-10-29T10:00:00Z",
  "sync_status": "idle"
}
```

#### Sync Products

```http
POST /api/products/sync
```

**Request Body:**
```json
{
  "force": false
}
```

**Response:**
```json
{
  "status": "syncing",
  "message": "Product sync started",
  "job_id": "sync-job-123"
}
```

#### Get Sync Status

```http
GET /api/products/sync-status
```

**Response:**
```json
{
  "status": "syncing",
  "progress": 65,
  "current_count": 98,
  "total_count": 150
}
```

#### Batch Upload Products

```http
POST /api/products/batch
```

**Request Body:**
```json
{
  "products": [
    {
      "shopify_product_id": "1234567890",
      "title": "Product Name",
      "price": 29.99,
      "inventory_quantity": 100
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "imported_count": 1,
  "errors": []
}
```

### Recommendation Configs

#### List Recommendation Configs

```http
GET /api/reco-configs
```

**Response:**
```json
[
  {
    "id": "config-123",
    "name": "Similar Products",
    "recommendation_type": "similar",
    "placement": "product_page",
    "is_enabled": true,
    "ai_config": {
      "algorithm": "collaborative_filtering",
      "confidence_threshold": 0.75,
      "max_results": 10,
      "diversity_factor": 0.5,
      "personalization_weight": 0.7,
      "recency_weight": 0.3
    },
    "merchandising_rules": [],
    "manual_products": [],
    "created_at": "2025-10-29T00:00:00Z"
  }
]
```

#### Get Recommendation Config

```http
GET /api/reco-configs/:id
```

**Parameters:**
- `id` (path) - Config ID

**Response:**
```json
{
  "id": "config-123",
  "name": "Similar Products",
  "recommendation_type": "similar",
  "placement": "product_page",
  "is_enabled": true,
  "ai_config": { ... },
  "merchandising_rules": [],
  "manual_products": []
}
```

#### Create Recommendation Config

```http
POST /api/reco-configs
```

**Request Body:**
```json
{
  "name": "Similar Products",
  "recommendation_type": "similar",
  "placement": "product_page",
  "is_enabled": true,
  "ai_config": {
    "algorithm": "collaborative_filtering",
    "confidence_threshold": 0.75,
    "max_results": 10,
    "diversity_factor": 0.5,
    "personalization_weight": 0.7,
    "recency_weight": 0.3
  }
}
```

**Response:**
```json
{
  "id": "config-123",
  "name": "Similar Products",
  ...
}
```

#### Update Recommendation Config

```http
PUT /api/reco-configs/:id
```

**Parameters:**
- `id` (path) - Config ID

**Request Body:** Same as Create

**Response:**
```json
{
  "id": "config-123",
  "name": "Similar Products",
  ...
}
```

#### Delete Recommendation Config

```http
DELETE /api/reco-configs/:id
```

**Parameters:**
- `id` (path) - Config ID

**Response:**
```
204 No Content
```

### Merchandising Rules

#### Get Global Merchandising Rules

```http
GET /api/merchandising-rules/global
```

**Response:**
```json
[
  {
    "id": "rule-123",
    "rule_type": "pin",
    "priority": 1,
    "is_global": true,
    "product_ids": ["prod-123", "prod-456"],
    "positions": [0, 1],
    "active": true
  }
]
```

#### Update Global Merchandising Rules

```http
POST /api/merchandising-rules/global
```

**Request Body:**
```json
{
  "rules": [
    {
      "rule_type": "pin",
      "priority": 1,
      "product_ids": ["prod-123"],
      "positions": [0]
    }
  ]
}
```

**Response:**
```json
[
  {
    "id": "rule-123",
    "rule_type": "pin",
    ...
  }
]
```

### Analytics

#### Get Metrics

```http
GET /api/analytics/metrics
```

**Query Parameters:**
- `start_date` (optional) - Start date (ISO format)
- `end_date` (optional) - End date (ISO format)

**Response:**
```json
{
  "total_impressions": 125430,
  "total_clicks": 8762,
  "total_conversions": 1247,
  "click_through_rate": 0.0699,
  "conversion_rate": 0.1423,
  "revenue_attributed": 45230.50,
  "average_order_value": 36.27,
  "roi_percentage": 342.5
}
```

#### Get Trends

```http
GET /api/analytics/trends
```

**Query Parameters:**
- `days` (optional) - Number of days (default: 30)

**Response:**
```json
[
  {
    "date": "2025-10-01",
    "impressions": 4230,
    "clicks": 296,
    "conversions": 42,
    "revenue": 1520.50,
    "ctr": 0.0700,
    "conversion_rate": 0.1419
  }
]
```

#### Get Performance by Type

```http
GET /api/analytics/performance
```

**Response:**
```json
[
  {
    "config_id": "config-123",
    "config_name": "Similar Products",
    "recommendation_type": "similar",
    "impressions": 45230,
    "clicks": 3167,
    "conversions": 451,
    "revenue": 16320.30,
    "ctr": 0.0700,
    "conversion_rate": 0.1424
  }
]
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `204 No Content` - Request succeeded with no response body
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing rate limiting to prevent abuse.

## Data Models

### Recommendation Types

- `similar` - Similar Products
- `bought_together` - Frequently Bought Together
- `cross_sell` - Cross-sell
- `upsell` - Upsell
- `personalized` - Personalized Recommendations
- `trending` - Trending Products

### Placement Options

- `product_page` - Product Detail Page
- `cart_page` - Shopping Cart
- `home_page` - Home Page
- `collection_page` - Collection/Category Page
- `checkout_page` - Checkout Page

### Algorithm Types

- `collaborative_filtering` - Collaborative Filtering
- `content_based` - Content-Based Filtering
- `hybrid` - Hybrid Approach
- `popularity_based` - Popularity-Based
- `deep_learning` - Deep Learning

### Merchandising Rule Types

- `pin` - Pin products to specific positions
- `boost` - Boost product rankings
- `bury` - Bury (lower) product rankings
- `whitelist` - Include only specific products
- `blacklist` - Exclude specific products
- `inventory_based` - Filter by inventory levels
- `time_based` - Apply during specific time periods
- `price_range` - Filter by price range
- `tag_based` - Filter by product tags

## Backend Integration

This plugin acts as a proxy to the FastAPI backend. The backend implements the actual recommendation engine, machine learning models, and data storage.

For backend API documentation, see:
- Backend Repository: https://github.com/decisionstatus/recommendate_backend
- OpenAPI Spec: https://api.smartcalc.in/openapi.json
- Interactive Docs: https://api.smartcalc.in/docs

## Development Notes

- In development mode, if the backend is unavailable, the API returns mock data for some endpoints
- The `DEFAULT_STORE_ID` environment variable is used for all API calls in development
- In production, implement proper Shopify OAuth and use the authenticated store ID
