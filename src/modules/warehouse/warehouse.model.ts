export interface Warehouse {
  id: string
  /** It identifies the warehouse using a number of three digits, e.g.: 012 */
  code: string
  name: string
  lat: number
  lng: number
  address: string
  createdBy: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WarehouseAssociation {
  id: string
  userId: string
  warehouseId: string
  associatedAt: Date
  disassociatedAt?: Date
}

export type NewWarehousePayload = Omit<Location, 'address'> & Pick<Warehouse, 'name'>
