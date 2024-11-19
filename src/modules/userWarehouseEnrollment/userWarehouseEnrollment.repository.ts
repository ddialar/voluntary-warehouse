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
  id,
  userId,
  warehouseId,
  unenrolledAt
}: {
  id: string
  userId: string
  warehouseId: string
  unenrolledAt: Date
}) =>
  UserWarehouseEnrollmentStore.unenrollUserFromWarehouse({
    id,
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
