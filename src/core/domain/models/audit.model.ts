export const AUDIT_ACTIONS = [
  'warehouse_created',
  'warehouse_disabled',
  'user_created',
  'user_blocked',
  'user_role_changed',
  'order_created',
  'order_updated',
  'order_ready_for_pickup',
  'order_picked_up',
  'order_delivered',
  'system_config_updated',
  'auth_failed'
] as const
export type AuditAction = typeof AUDIT_ACTIONS[number]

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: AuditAction;
  details: Record<string, unknown>;
}