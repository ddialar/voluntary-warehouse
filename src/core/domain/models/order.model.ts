export type OrderStatus =
  /** An order has been created by a volunteer and it's waiting to be prepared */
  | 'pending'
  /** An order previously created is been prepared */
  | 'in_preparation'
  /** The order is ready to be picked up by a volunteer to be delivered */
  | 'ready_for_pickup'
  /** The order was picked up and in delivery process */
  | 'in_delivery'
  /** The order was delivered successfully */
  | 'delivered'
  /** The order was picked up but never delivered */
  | 'lost';

export interface OrderItem {
  productId: string;
  quantity: number;
  packed: boolean;
}

export interface Order {
  id: string;
  code: string; // AAA-PPPP
  warehouseId: string;
  requestedBy: string;
  preparedBy?: string;
  deliveredBy?: string;
  deliveryLocation: Location;
  items: OrderItem[];
  status: OrderStatus;
  priority: number; // Default 0
  createdAt: Date;
  updatedAt: Date;
  preparationStartedAt?: Date;
  preparationStartedBy?: string;
  readyForDeliveryAt?: Date;
  pickedUpAt?: Date;
  pickedUpBy?: string;
  deliveredAt?: Date;
  comments?: string;
}

