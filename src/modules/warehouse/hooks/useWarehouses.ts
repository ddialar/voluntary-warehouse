import { WAREHOUSE_API_URI } from '@config'
import { get, post } from '@fetcher'
import { NewWarehousePayload, Warehouse } from '@modules/warehouse/warehouse.model'
import useSWR, { mutate } from 'swr'

export const getWarehouses = async () => get<{ warehouses: Array<Warehouse> }>({ url: WAREHOUSE_API_URI })

export const createWarehouse = async (data: NewWarehousePayload) =>
  post<Warehouse, NewWarehousePayload>({ url: WAREHOUSE_API_URI, body: data })

const WAREHOUSES_KEY = 'warehouses_api'

export const useWarehouses = () => {
  const { data, error, isLoading } = useSWR(WAREHOUSES_KEY, getWarehouses)

  const create = async (payload: NewWarehousePayload) => {
    try {
      const result = await createWarehouse(payload)

      if (result.success) {
        mutate(
          WAREHOUSES_KEY,
          {
            result: {
              warehouses: [...((data?.result.warehouses as Array<Warehouse>) || []), result.result]
            }
          },
          false
        )
      }

      return result
    } catch (error) {
      throw error
    }
  }

  return {
    warehouses: (data?.result.warehouses as Array<Warehouse>) || [],
    isLoading,
    error,
    create
  }
}
