import { NewWarehouse, Warehouse } from './warehouse.model'
import { WarehouseStore } from './warehouse.store'

const createWarehouse = async (warehouse: NewWarehouse): Promise<Warehouse> => WarehouseStore.createWarehouse(warehouse)

const getWarehouses = async (): Promise<Array<Warehouse>> => WarehouseStore.getWarehouses()

const countWarehousesCreatedTodayByUserId = async (
  params: Parameters<typeof WarehouseStore.countWarehousesCreatedTodayByUserId>[0]
): Promise<number> => WarehouseStore.countWarehousesCreatedTodayByUserId(params)

const getLastCreatedWarehouse = async (): ReturnType<typeof WarehouseStore.getLastCreatedWarehouse> =>
  WarehouseStore.getLastCreatedWarehouse()

const getWarehouseByLocation = async (location: { lat: number; lng: number }): Promise<Warehouse | null> => {
  // const warehousesRef = collection(db, WAREHOUSES_COLLECTION)
  // const radius = 0.05 // 50 meters in degrees approximately

  // const q = query(
  //   warehousesRef,
  //   where('geopoint', '>=', new GeoPoint(location.lat - radius, location.lng - radius)),
  //   where('geopoint', '<=', new GeoPoint(location.lat + radius, location.lng + radius))
  // )

  // const querySnapshot = await getDocs(q)

  // if (querySnapshot.empty) {
  //   return null
  // }

  // const warehouse = querySnapshot.docs[0].data() as Warehouse
  // return warehouse

  return Promise.resolve(null)
}

export const WarehouseRepository = {
  createWarehouse,
  getWarehouses,
  getLastCreatedWarehouse,
  countWarehousesCreatedTodayByUserId,
  getWarehouseByLocation
}
