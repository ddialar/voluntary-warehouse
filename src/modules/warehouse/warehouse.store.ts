import { db } from '@db'
import { NewWarehouse, Warehouse } from './warehouse.model'

const Entity = 'warehouse'

const createWarehouse = async (warehouse: NewWarehouse): Promise<Warehouse> => {
  const { data, error } = await db.from(Entity).insert(warehouse).select().limit(1).single().throwOnError()

  if (error) {
    console.error('Error creating warehouse:', error.message)
  }

  return data as Warehouse
}

const getWarehouses = async (): Promise<Array<Warehouse>> => {
  const { data, error } = await db.from(Entity).select().throwOnError()

  if (error) {
    console.error('Error fetching warehouses:', error.message)
  }

  return data as Array<Warehouse>
}

interface GetWarehousesCreatedTodayByUserIdParams {
  createdBy: string
  startDate: Date
  endDate: Date
}

const getLastCreatedWarehouse = async (): Promise<Warehouse | null> => {
  try {
    const { data, error } = await db.from(Entity).select().order('createdAt', { ascending: false }).limit(1).single()

    if (error) throw error

    return <Warehouse>data || null
  } catch (error) {
    console.error('Error fetching last created warehouse', error)
    throw error
  }
}

const countWarehousesCreatedTodayByUserId = async ({
  createdBy,
  startDate,
  endDate
}: GetWarehousesCreatedTodayByUserIdParams): Promise<number> => {
  try {
    const { count, error } = await db
      .from(Entity)
      .select('*', { count: 'exact', head: true })
      .eq('createdBy', createdBy)
      .gte('createdAt', startDate.toISOString())
      .lte('createdAt', endDate.toISOString())

    if (error) throw error

    return count || 0
  } catch (error) {
    console.error('Error fetching warehouses by date range:', error)
    throw error
  }
}

const rollbackWarehouse = async (warehouseId: string) => {
  const { error } = await db.from(Entity).delete().eq('id', warehouseId).throwOnError()

  if (error) {
    console.error(`Error deleting warehouse '${warehouseId}'`, error)
    throw error
  }
}

export const WarehouseStore = {
  createWarehouse,
  getWarehouses,
  getLastCreatedWarehouse,
  countWarehousesCreatedTodayByUserId,
  rollbackWarehouse
}
