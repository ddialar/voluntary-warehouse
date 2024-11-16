export interface Warehouse {
  id: string
  /** It identifies the warehouse using a number of three digits, e.g.: 012 */
  code: string
  name: string
  lat: number
  lng: number
  address: string
  createdBy: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type NewWarehouse = Pick<Warehouse, 'code' | 'name' | 'lat' | 'lng' | 'address' | 'createdBy' | 'isActive'>

export interface WarehouseAssociation {
  id: string
  userId: string
  warehouseId: string
  associatedAt: Date
  disassociatedAt?: Date
}

export type NewWarehousePayload = Pick<Warehouse, 'lat' | 'lng' | 'name'>
