import { MAX_AMOUNT_OF_WAREHOUSES_PER_DAY } from '@config'
import { Warehouse } from '@modules/warehouse/warehouse.model'
import { WarehouseRepository } from '@modules/warehouse/warehouse.repository'
import { randomUUID } from 'crypto'
import { MaximumAmountOfCreatedWarehousesReachedError } from './errors'

const throwErrorIfUserCannotCreateMoreWarehousesToday = async (userId: string): Promise<void> => {
  const start = new Date(new Date().setHours(0, 0, 0, 0))
  const end = new Date(new Date().setHours(23, 59, 59, 0))

  const warehousesCreatedToday = await WarehouseRepository.getWarehousesCreatedTodayByUserId({ userId, start, end })
  if (warehousesCreatedToday.length >= MAX_AMOUNT_OF_WAREHOUSES_PER_DAY) {
    // TODO: Throw a correctly formatted error
    throw new MaximumAmountOfCreatedWarehousesReachedError()
  }
}

const throwErrorIfThereAreOtherWarehousesNearby = async (location: { lat: number; lng: number }): Promise<void> => {
  const existingWarehouse = await WarehouseRepository.getWarehouseByLocation(location)
  if (existingWarehouse) {
    throw new Error('Ya existe un almacén en esta ubicación')
  }
}

// REMOVE: This is a mock implementation
let mockedSequence = 0
const getNextWarehouseCode = async (): Promise<string> => {
  // const sequenceRef = doc(collection(db, WAREHOUSE_SEQUENCES_COLLECTION), 'warehouse')

  // try {
  //   const sequenceDoc = await getDoc(sequenceRef)
  //   let sequence = 1

  //   if (sequenceDoc.exists()) {
  //     sequence = sequenceDoc.data().currentValue + 1
  //   }

  //   await setDoc(sequenceRef, { currentValue: sequence })

  //   return sequence.toString().padStart(3, '0')
  // } catch (error) {
  //   console.error('Error getting warehouse sequence:', error)
  //   throw new Error('Error generando el código del almacén')
  // }

  return (++mockedSequence).toString().padStart(3, '0')
}

interface CreateWarehouseProps {
  name: string
  lat: number
  lng: number
  userId: string
}

const createWarehouse = async ({ name, lat, lng, userId }: CreateWarehouseProps): Promise<Warehouse> => {
  console.dir({ name, lat, lng, userId }, { depth: null })

  await throwErrorIfUserCannotCreateMoreWarehousesToday(userId)
  await throwErrorIfThereAreOtherWarehousesNearby({ lat, lng })

  try {
    // Get sequential code for the warehouse
    const warehouseCode = await getNextWarehouseCode()

    const warehouse: Warehouse = {
      id: randomUUID(),
      code: warehouseCode,
      name,
      // REFACTOR: Include the address in the location object once it's provided in the request.
      location: { lat, lng, address: '' },
      createdBy: userId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.dir({ method: 'createWarehouse controller', warehouse }, { depth: null })

    return await WarehouseRepository.createWarehouse(warehouse)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Error al crear el almacén')
  }
}

// export const getWarehouse = async (id: string): Promise<Warehouse | null> => {
//   const warehouseRef = doc(collection(db, WAREHOUSES_COLLECTION), id)
//   const warehouseDoc = await getDoc(warehouseRef)

//   if (!warehouseDoc.exists()) {
//     return null
//   }

//   return {
//     id: warehouseDoc.id,
//     ...warehouseDoc.data()
//   } as Warehouse
// }

const getWarehouses = async (): Promise<Array<Warehouse>> => WarehouseRepository.getWarehouses()

export const WarehouseController = {
  createWarehouse,
  getWarehouses
}
