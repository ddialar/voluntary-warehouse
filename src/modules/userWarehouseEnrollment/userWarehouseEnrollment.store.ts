import { db } from '@db'
import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'

const Entity = 'user_warehouse_enrollment'

const enrollUserToWarehouse = async (newEnrollment: Omit<UserWarehouseEnrollment, 'id'>) => {
  const { error } = await db.from(Entity).insert(newEnrollment)

  if (error) throw error
}

const getEnrolledWarehousesByUserId = async (userId: string): Promise<Array<UserWarehouseEnrollment>> => {
  try {
    const { data, error } = await db.from(Entity).select().eq('userId', userId).is('unenrolledAt', null)

    if (error) throw error

    return data as Array<UserWarehouseEnrollment>
  } catch (error) {
    console.error(`Error fetching enrolled warehouses by user id '${userId}'`, error)
    throw error
  }
}

export const UserWarehouseEnrollmentStore = {
  enrollUserToWarehouse,
  getEnrolledWarehousesByUserId
}
