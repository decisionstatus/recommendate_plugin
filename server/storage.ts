// Storage interface for Shopify Recommendations App
// All data is persisted in the external Python FastAPI backend
// This interface is kept minimal as we proxy all requests to the backend

export interface IStorage {
  // Placeholder - all actual storage handled by Python FastAPI backend
}

export class MemStorage implements IStorage {
  constructor() {
    // No in-memory storage needed - everything goes to external API
  }
}

export const storage = new MemStorage();
