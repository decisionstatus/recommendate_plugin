import { z } from "zod";

// Store schemas
export const storeSchema = z.object({
  id: z.string(),
  shop_domain: z.string(),
  shop_name: z.string(),
  access_token: z.string().optional(),
  plan_id: z.string().optional(),
  is_active: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const insertStoreSchema = storeSchema.omit({ id: true, created_at: true, updated_at: true });

export type Store = z.infer<typeof storeSchema>;
export type InsertStore = z.infer<typeof insertStoreSchema>;

// Product schemas
export const productSchema = z.object({
  id: z.string(),
  store_id: z.string(),
  external_id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  image_url: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants_count: z.number().optional(),
  inventory_quantity: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const insertProductSchema = productSchema.omit({ id: true, created_at: true, updated_at: true });

export type Product = z.infer<typeof productSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Catalog info schema
export const catalogInfoSchema = z.object({
  product_count: z.number(),
  batch_count: z.number(),
  last_sync_at: z.string().optional(),
  sync_status: z.enum(["idle", "syncing", "completed", "error"]),
});

export type CatalogInfo = z.infer<typeof catalogInfoSchema>;

// Recommendation config schemas
export const recommendationTypeSchema = z.enum([
  "similar",
  "bought_together",
  "cross_sell",
  "upsell",
  "personalized",
  "trending",
]);

export const algorithmTypeSchema = z.enum([
  "collaborative_filtering",
  "content_based",
  "hybrid",
  "popularity_based",
  "deep_learning",
]);

export const placementTypeSchema = z.enum([
  "product_page",
  "cart_page",
  "home_page",
  "collection_page",
  "checkout_page",
]);

export const aiConfigSchema = z.object({
  algorithm: algorithmTypeSchema,
  confidence_threshold: z.number().min(0).max(1),
  max_results: z.number().min(1).max(50),
  diversity_factor: z.number().min(0).max(1).optional(),
  personalization_weight: z.number().min(0).max(1).optional(),
  recency_weight: z.number().min(0).max(1).optional(),
});

export type AIConfig = z.infer<typeof aiConfigSchema>;

// Merchandising rule schemas
export const ruleTypeSchema = z.enum([
  "pin",
  "boost",
  "bury",
  "whitelist",
  "blacklist",
  "inventory_based",
  "time_based",
  "price_range",
  "tag_based",
]);

export const merchandisingRuleSchema = z.object({
  id: z.string(),
  type: ruleTypeSchema,
  product_ids: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  vendor: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  min_inventory: z.number().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  priority: z.number(),
  is_global: z.boolean(),
});

export const insertMerchandisingRuleSchema = merchandisingRuleSchema.omit({ id: true });

export type MerchandisingRule = z.infer<typeof merchandisingRuleSchema>;
export type InsertMerchandisingRule = z.infer<typeof insertMerchandisingRuleSchema>;

// Recommendation config schemas
export const recoConfigSchema = z.object({
  id: z.string(),
  store_id: z.string(),
  name: z.string(),
  recommendation_type: recommendationTypeSchema,
  placement: placementTypeSchema,
  is_enabled: z.boolean(),
  ai_config: aiConfigSchema,
  merchandising_rules: z.array(merchandisingRuleSchema),
  manual_product_ids: z.array(z.string()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const insertRecoConfigSchema = recoConfigSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type RecoConfig = z.infer<typeof recoConfigSchema>;
export type InsertRecoConfig = z.infer<typeof insertRecoConfigSchema>;

// Analytics schemas
export const analyticsMetricsSchema = z.object({
  total_impressions: z.number(),
  total_clicks: z.number(),
  total_conversions: z.number(),
  click_through_rate: z.number(),
  conversion_rate: z.number(),
  revenue_attributed: z.number(),
  average_order_value: z.number(),
  roi_percentage: z.number(),
});

export type AnalyticsMetrics = z.infer<typeof analyticsMetricsSchema>;

export const recoPerformanceSchema = z.object({
  config_id: z.string(),
  config_name: z.string(),
  recommendation_type: recommendationTypeSchema,
  impressions: z.number(),
  clicks: z.number(),
  conversions: z.number(),
  revenue: z.number(),
  ctr: z.number(),
  conversion_rate: z.number(),
});

export type RecoPerformance = z.infer<typeof recoPerformanceSchema>;

export const analyticsTrendSchema = z.object({
  date: z.string(),
  impressions: z.number(),
  clicks: z.number(),
  conversions: z.number(),
  revenue: z.number(),
  ctr: z.number(),
  conversion_rate: z.number(),
});

export type AnalyticsTrend = z.infer<typeof analyticsTrendSchema>;

// Sync status schema
export const syncStatusSchema = z.object({
  status: z.enum(["idle", "syncing", "completed", "error"]),
  progress: z.number().min(0).max(100),
  current_count: z.number(),
  total_count: z.number(),
  message: z.string().optional(),
  started_at: z.string().optional(),
  completed_at: z.string().optional(),
});

export type SyncStatus = z.infer<typeof syncStatusSchema>;
