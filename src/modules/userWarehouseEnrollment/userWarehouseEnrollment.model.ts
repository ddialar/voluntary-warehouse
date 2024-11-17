export interface UserWarehouseEnrollment {
  id: string
  userId: string
  warehouseId: string
  enrolledAt: Date
  unenrolledAt: Date | null
}
