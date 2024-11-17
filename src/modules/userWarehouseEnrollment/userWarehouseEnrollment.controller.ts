import { randomUUID } from 'crypto'
import { UserWarehouseEnrollment } from './userWarehouseEnrollment.model'
import { UserWarehouseEnrollmentRepository } from './userWarehouseEnrollment.repository'

const enrollUserToWarehouse = async ({ userId, warehouseId }: { userId: string; warehouseId: string }) => {
  try {
    const newEnrollment: UserWarehouseEnrollment = {
      id: randomUUID(),
      userId,
      warehouseId,
      enrolledAt: new Date(),
      unenrolledAt: null
    }

    await UserWarehouseEnrollmentRepository.enrollUserToWarehouse(newEnrollment)
  } catch (error) {
    throw new Error(`Error enrolling user '${userId}' into warehouse '${warehouseId}'. ${(<Error>error).message}`)
  }
}

export const UserWarehouseEnrollmentController = {
  enrollUserToWarehouse
}
