export const USER_ROLES = ['super_admin', 'admin', 'volunteer', 'user'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const USER_ROLE_VALUES: Record<UserRole, number> = {
  super_admin: 100,
  admin: 90,
  volunteer: 2,
  user: 1
}

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  currentWarehouseId?: string
  isEnabled: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
