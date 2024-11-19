import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'
import { UserWarehouseEnrollmentStore } from './userWarehouseEnrollment.store'

const enrollUserAtWarehouse = async (newEnrollment: UserWarehouseEnrollment) =>
  UserWarehouseEnrollmentStore.enrollUserAtWarehouse(newEnrollment)

const getEnrolledWarehousesByUserId = async (userId: string) =>
  UserWarehouseEnrollmentStore.getEnrolledWarehousesByUserId(userId)

const getWarehousesEnrollmentByUserIdAndWarehouseId = async ({
  userId,
  warehouseId
}: {
  userId: string
  warehouseId: string
}) =>
  UserWarehouseEnrollmentStore.getWarehousesEnrollmentByUserIdAndWarehouseId({
    userId,
    warehouseId
  })

const unenrollUserFromWarehouse = async ({
  userId,
  warehouseId,
  unenrolledAt
}: {
  userId: string
  warehouseId: string
  unenrolledAt: Date
}) =>
  UserWarehouseEnrollmentStore.unenrollUserFromWarehouse({
    userId,
    warehouseId,
    unenrolledAt
  })

export const UserWarehouseEnrollmentRepository = {
  enrollUserAtWarehouse,
  getEnrolledWarehousesByUserId,
  getWarehousesEnrollmentByUserIdAndWarehouseId,
  unenrollUserFromWarehouse
}
