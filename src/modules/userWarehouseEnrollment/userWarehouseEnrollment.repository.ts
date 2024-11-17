import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'
import { UserWarehouseEnrollmentStore } from './userWarehouseEnrollment.store'

const enrollUserToWarehouse = async (newEnrollment: UserWarehouseEnrollment) =>
  UserWarehouseEnrollmentStore.enrollUserToWarehouse(newEnrollment)

export const UserWarehouseEnrollmentRepository = {
  enrollUserToWarehouse
}
