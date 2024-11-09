export interface WarehouseAssociation {
  id: string;
  userId: string;
  warehouseId: string;
  associatedAt: Date;
  disassociatedAt?: Date;
}
