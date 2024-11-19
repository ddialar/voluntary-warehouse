import { CustomApiError } from '@errors'
import { WarehouseNoFoundError } from '@modules/warehouse/errors'
import { WarehouseController } from '@modules/warehouse/warehouse.controller'
import { randomUUID } from 'crypto'
import { WarehouseEnrollmentNoFoundError } from './errors'
import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'
import { UserWarehouseEnrollmentRepository } from './userWarehouseEnrollment.repository'

const enrollUserAtWarehouse = async ({ userId, warehouseId }: { userId: string; warehouseId: string }) => {
  try {
    const persistedWarehouse = await WarehouseController.getWarehouseById(warehouseId)
    if (!persistedWarehouse) {
      throw new WarehouseNoFoundError()
    }

    const warehouseEnrollment = await getWarehousesEnrollmentByUserIdAndWarehouseId({
      userId,
      warehouseId
    })
    if (warehouseEnrollment) {
      return
    }

    const newEnrollment: UserWarehouseEnrollment = {
      id: randomUUID(),
      userId,
      warehouseId,
      enrolledAt: new Date(),
      unenrolledAt: null
    }

    await UserWarehouseEnrollmentRepository.enrollUserAtWarehouse(newEnrollment)
  } catch (error) {
    if (error instanceof CustomApiError) {
      throw error
    }
    throw new Error(`Error enrolling user '${userId}' at warehouse '${warehouseId}'. ${(<Error>error).message}`)
  }
}

const getEnrolledWarehousesByUserId = async (userId: string) =>
  UserWarehouseEnrollmentRepository.getEnrolledWarehousesByUserId(userId)

const getWarehousesEnrollmentByUserIdAndWarehouseId = async ({
  userId,
  warehouseId
}: {
  userId: string
  warehouseId: string
}) =>
  UserWarehouseEnrollmentRepository.getWarehousesEnrollmentByUserIdAndWarehouseId({
    userId,
    warehouseId
  })

const unenrollUserFromWarehouse = async ({ userId, warehouseId }: { userId: string; warehouseId: string }) => {
  try {
    const persistedWarehouse = await WarehouseController.getWarehouseById(warehouseId)
    if (!persistedWarehouse) {
      throw new WarehouseNoFoundError()
    }

    const warehouseEnrollment = await getWarehousesEnrollmentByUserIdAndWarehouseId({
      userId,
      warehouseId
    })
    if (!warehouseEnrollment) {
      throw new WarehouseEnrollmentNoFoundError()
    }

    await UserWarehouseEnrollmentRepository.unenrollUserFromWarehouse({
      userId,
      warehouseId,
      unenrolledAt: new Date()
    })
  } catch (error) {
    if (error instanceof CustomApiError) {
      throw error
    }
    throw new Error(`Error unenrolling user '${userId}' from warehouse '${warehouseId}'. ${(<Error>error).message}`)
  }
}

export const UserWarehouseEnrollmentController = {
  enrollUserAtWarehouse,
  getEnrolledWarehousesByUserId,
  unenrollUserFromWarehouse
}
