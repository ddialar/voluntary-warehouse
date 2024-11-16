import { db } from '@db'
import { Warehouse } from './warehouse.model'

const Entity = 'warehouse'

const getWarehouses = async (): Promise<Array<Warehouse>> => {
  const { data, error } = await db.from(Entity).select().throwOnError()

  if (error) {
    console.error('Error fetching warehouses:', error.message)
  }

  return data as Array<Warehouse>
}

export const WarehouseStore = {
  getWarehouses
}
