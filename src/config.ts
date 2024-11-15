export const NODE_ENV = process.env.NODE_ENV || 'development'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

export const AVAILABLE_LOCALES = ['es', 'ca', 'en']
export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'es'

export const API_BASE = '/api'
export const WAREHOUSE_API_URI = API_BASE.concat('/warehouse')

export const MAX_AMOUNT_OF_WAREHOUSES_PER_DAY = Number(process.env.NEXT_PUBLIC_MAX_AMOUNT_OF_WAREHOUSES_PER_DAY || '1')
