import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

const API_BASE_URL = "https://api.smartcalc.in/api/v1";

// Default store ID for development - in production this would come from Shopify session
const DEFAULT_STORE_ID = "dev-store-1";

export async function registerRoutes(app: Express): Promise<Server> {
  // Helper function to proxy requests to Python backend
  const proxyRequest = async (method: string, path: string, data?: any) => {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${path}`,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error proxying ${method} ${path}:`, error.response?.data || error.message);
      throw error;
    }
  };

  // Store routes
  app.get("/api/stores", async (req, res) => {
    try {
      const data = await proxyRequest('GET', '/stores');
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.get("/api/stores/:id", async (req, res) => {
    try {
      const data = await proxyRequest('GET', `/stores/${req.params.id}`);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const data = await proxyRequest('GET', `/stores/${DEFAULT_STORE_ID}/products`);
      res.json(data);
    } catch (error: any) {
      // Return empty array if backend is not available
      console.log('Backend not available, returning mock data');
      res.json([]);
    }
  });

  app.get("/api/products/info", async (req, res) => {
    try {
      const data = await proxyRequest('GET', `/stores/${DEFAULT_STORE_ID}/products/info`);
      res.json(data);
    } catch (error: any) {
      // Return mock catalog info if backend is not available
      console.log('Backend not available, returning mock data');
      res.json({
        product_count: 0,
        batch_count: 0,
        last_sync_at: null,
        sync_status: 'idle',
      });
    }
  });

  app.post("/api/products/sync", async (req, res) => {
    try {
      const data = await proxyRequest('POST', `/stores/${DEFAULT_STORE_ID}/products/sync`, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.get("/api/products/sync-status", async (req, res) => {
    try {
      // Mock sync status for development
      const syncStatus = {
        status: 'idle',
        progress: 0,
        current_count: 0,
        total_count: 0,
      };
      res.json(syncStatus);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.post("/api/products/batch", async (req, res) => {
    try {
      const data = await proxyRequest('POST', `/stores/${DEFAULT_STORE_ID}/products/batch`, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  // Recommendation config routes
  app.get("/api/reco-configs", async (req, res) => {
    try {
      const data = await proxyRequest('GET', `/stores/${DEFAULT_STORE_ID}/reco-configs`);
      res.json(data);
    } catch (error: any) {
      // Return empty array if backend is not available
      console.log('Backend not available, returning mock data');
      res.json([]);
    }
  });

  app.get("/api/reco-configs/:id", async (req, res) => {
    try {
      const data = await proxyRequest('GET', `/stores/${DEFAULT_STORE_ID}/reco-configs/${req.params.id}`);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.post("/api/reco-configs", async (req, res) => {
    try {
      const data = await proxyRequest('POST', `/stores/${DEFAULT_STORE_ID}/reco-configs`, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.put("/api/reco-configs/:id", async (req, res) => {
    try {
      const data = await proxyRequest('PUT', `/stores/${DEFAULT_STORE_ID}/reco-configs/${req.params.id}`, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.delete("/api/reco-configs/:id", async (req, res) => {
    try {
      await proxyRequest('DELETE', `/stores/${DEFAULT_STORE_ID}/reco-configs/${req.params.id}`);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  // Global merchandising rules routes
  app.get("/api/merchandising-rules/global", async (req, res) => {
    try {
      // Get all configs and extract global rules
      const configs = await proxyRequest('GET', `/stores/${DEFAULT_STORE_ID}/reco-configs`);
      const globalRules = configs.flatMap((config: any) => 
        config.merchandising_rules?.filter((rule: any) => rule.is_global) || []
      );
      res.json(globalRules);
    } catch (error: any) {
      // Return empty array if backend is not available
      console.log('Backend not available, returning mock data');
      res.json([]);
    }
  });

  app.post("/api/merchandising-rules/global", async (req, res) => {
    try {
      // In a real implementation, this would update global rules across all configs
      // For now, return the rules as-is
      res.json(req.body.rules);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  // Analytics routes
  app.get("/api/analytics/metrics", async (req, res) => {
    try {
      // Mock analytics data for development
      const metrics = {
        total_impressions: 125430,
        total_clicks: 8762,
        total_conversions: 1247,
        click_through_rate: 0.0699,
        conversion_rate: 0.1423,
        revenue_attributed: 45230.50,
        average_order_value: 36.27,
        roi_percentage: 342.5,
      };
      res.json(metrics);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/trends", async (req, res) => {
    try {
      // Mock trend data for development
      const trends = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          impressions: Math.floor(Math.random() * 5000) + 3000,
          clicks: Math.floor(Math.random() * 400) + 200,
          conversions: Math.floor(Math.random() * 60) + 30,
          revenue: Math.floor(Math.random() * 2000) + 1000,
          ctr: Math.random() * 0.05 + 0.05,
          conversion_rate: Math.random() * 0.1 + 0.1,
        };
      });
      res.json(trends);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/performance", async (req, res) => {
    try {
      // Mock performance data for development
      const performance = [
        {
          config_id: '1',
          config_name: 'Similar Products',
          recommendation_type: 'similar',
          impressions: 45230,
          clicks: 3167,
          conversions: 451,
          revenue: 16320.30,
          ctr: 0.0700,
          conversion_rate: 0.1424,
        },
        {
          config_id: '2',
          config_name: 'Bought Together',
          recommendation_type: 'bought_together',
          impressions: 38120,
          clicks: 2670,
          conversions: 380,
          revenue: 13770.20,
          ctr: 0.0700,
          conversion_rate: 0.1423,
        },
        {
          config_id: '3',
          config_name: 'Cross-sell',
          recommendation_type: 'cross_sell',
          impressions: 28450,
          clicks: 1991,
          conversions: 283,
          revenue: 10260.50,
          ctr: 0.0700,
          conversion_rate: 0.1421,
        },
        {
          config_id: '4',
          config_name: 'Upsell',
          recommendation_type: 'upsell',
          impressions: 13630,
          clicks: 934,
          conversions: 133,
          revenue: 4879.50,
          ctr: 0.0685,
          conversion_rate: 0.1424,
        },
      ];
      res.json(performance);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
