export interface Warehouse {
  id: string
  /** It identifies the warehouse using a number of three digits, e.g.: 012 */
  code: string
  name: string
  lat: number
  lng: number
  address: string
  createdBy: string
  isEnabled: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface MapWarehouse extends Warehouse {
  isEnrolled?: boolean
}

export type NewWarehouse = Pick<Warehouse, 'code' | 'name' | 'lat' | 'lng' | 'address' | 'createdBy'>

export type NewWarehousePayload = Pick<Warehouse, 'lat' | 'lng' | 'name'>
