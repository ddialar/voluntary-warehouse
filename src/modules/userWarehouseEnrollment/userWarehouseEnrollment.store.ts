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

const getWarehousesEnrollmentByUserIdAndWarehouseId = async ({
  userId,
  warehouseId
}: {
  userId: string
  warehouseId: string
}): Promise<UserWarehouseEnrollment | null> => {
  try {
    const { data, error } = await db
      .from(Entity)
      .select()
      .eq('userId', userId)
      .eq('warehouseId', warehouseId)
      .is('unenrolledAt', null)
      .limit(1)
      .single()

    if (error) throw error

    return data as UserWarehouseEnrollment | null
  } catch (error) {
    console.error(`Error fetching enrolled warehouse by user id '${userId}' and warehouse id '${warehouseId}'`, error)
    throw error
  }
}

const unenrollUserFromWarehouse = async ({
  userId,
  warehouseId,
  unenrolledAt
}: {
  userId: string
  warehouseId: string
  unenrolledAt: Date
}): Promise<void> => {
  try {
    const { error } = await db.from(Entity).update({ unenrolledAt }).eq('userId', userId).eq('warehouseId', warehouseId)

    if (error) throw error
  } catch (error) {
    console.error(`Error unenrolling warehouse by user id '${userId}' and warehouse id '${warehouseId}'`, error)
    throw error
  }
}

export const UserWarehouseEnrollmentStore = {
  enrollUserToWarehouse,
  getEnrolledWarehousesByUserId,
  getWarehousesEnrollmentByUserIdAndWarehouseId,
  unenrollUserFromWarehouse
}
