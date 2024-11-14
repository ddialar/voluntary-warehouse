export interface Location {
  lat: number
  lng: number
  address: string
}

export interface Warehouse {
  id: string
  code: string // AAA
  name: string
  location: Location
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
