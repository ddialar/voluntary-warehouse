import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'
import { UserWarehouseEnrollmentStore } from './userWarehouseEnrollment.store'

const enrollUserToWarehouse = async (newEnrollment: UserWarehouseEnrollment) =>
  UserWarehouseEnrollmentStore.enrollUserToWarehouse(newEnrollment)

const getEnrolledWarehousesByUserId = async (userId: string) =>
  UserWarehouseEnrollmentStore.getEnrolledWarehousesByUserId(userId)

export const UserWarehouseEnrollmentRepository = {
  enrollUserToWarehouse,
  getEnrolledWarehousesByUserId
}
