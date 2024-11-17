import { MAX_AMOUNT_OF_WAREHOUSES_PER_DAY } from '@config'
import { UserWarehouseEnrollmentController } from '@modules/userWarehouseEnrollment/userWarehouseEnrollment.controller'
import { NewWarehouse, Warehouse } from '@modules/warehouse/warehouse.model'
import { WarehouseRepository } from '@modules/warehouse/warehouse.repository'
import { MaximumAmountOfCreatedWarehousesReachedError } from './errors'

const throwErrorIfUserCannotCreateMoreWarehousesToday = async (userId: string): Promise<void> => {
  const startDate = new Date(new Date().setHours(0, 0, 0, 0))
  const endDate = new Date(new Date().setHours(23, 59, 59, 0))
  const warehousesCreatedToday = await WarehouseRepository.countWarehousesCreatedTodayByUserId({
    createdBy: userId,
    startDate,
    endDate
  })
  if (warehousesCreatedToday >= MAX_AMOUNT_OF_WAREHOUSES_PER_DAY) {
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

const getNextWarehouseCode = async (): Promise<string> => {
  const persistedWarehouse = await WarehouseRepository.getLastCreatedWarehouse()
  return (persistedWarehouse ? Number(persistedWarehouse.code) + 1 : 1).toString().padStart(3, '0')
}

interface CreateWarehouseProps {
  name: string
  lat: number
  lng: number
  userId: string
}

const createWarehouse = async ({ name, lat, lng, userId }: CreateWarehouseProps): Promise<Warehouse> => {
  await throwErrorIfUserCannotCreateMoreWarehousesToday(userId)
  await throwErrorIfThereAreOtherWarehousesNearby({ lat, lng })

  let persistedWarehouse: Warehouse

  try {
    const code = await getNextWarehouseCode()
    const warehouse: NewWarehouse = {
      code,
      name,
      lat,
      lng,
      // REFACTOR Provide this data from the creation process
      address: '',
      createdBy: userId
    }

    persistedWarehouse = await WarehouseRepository.createWarehouse(warehouse)
  } catch (error) {
    throw new Error(`Error al crear el almacén. ${(<Error>error).message}`)
  }

  try {
    await UserWarehouseEnrollmentController.enrollUserToWarehouse({ userId, warehouseId: persistedWarehouse.id })
  } catch (error) {
    await WarehouseRepository.rollbackWarehouse(persistedWarehouse.id)
    throw error
  }

  return persistedWarehouse
}

const getWarehouses = async (): Promise<Array<Warehouse>> => WarehouseRepository.getWarehouses()

export const WarehouseController = {
  createWarehouse,
  getWarehouses
}
