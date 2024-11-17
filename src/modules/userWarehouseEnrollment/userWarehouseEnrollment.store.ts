import { db } from '@db'
import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'

const Entity = 'user_warehouse_enrollment'

const enrollUserToWarehouse = async (newEnrollment: Omit<UserWarehouseEnrollment, 'id'>) => {
  const { error } = await db.from(Entity).insert(newEnrollment)

  if (error) throw error
}

export const UserWarehouseEnrollmentStore = {
  enrollUserToWarehouse
}
