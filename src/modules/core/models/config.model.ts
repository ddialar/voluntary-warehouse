export interface SystemConfig {
  maxOrdersPerLocationDaily: number;
  maxOfflineOrders: number;
  orderTimeoutHours: number;
  warehouseRadiusKm: number;
  locationErrorMarginMeters: number;
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
}