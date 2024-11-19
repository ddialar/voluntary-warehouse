import { WAREHOUSE_API_URI, WAREHOUSE_ENROLL_API_URI, WAREHOUSE_UNENROLL_API_URI } from '@config'
import { get, post, put } from '@fetcher'
import { NewWarehousePayload, Warehouse } from '@modules/warehouse/warehouse.model'
import useSWR, { mutate } from 'swr'

const getWarehouses = async () => get<{ warehouses: Array<Warehouse> }>({ url: WAREHOUSE_API_URI })

const createWarehouse = async (data: NewWarehousePayload) =>
  post<Warehouse, NewWarehousePayload>({ url: WAREHOUSE_API_URI, body: data })

const enrollUserAtWarehouse = async (warehouseId: string) =>
  post<unknown, { warehouseId: string }>({ url: WAREHOUSE_ENROLL_API_URI, body: { warehouseId } })

const unenrollUserFromWarehouse = async (warehouseId: string) =>
  put<unknown, { warehouseId: string }>({ url: WAREHOUSE_UNENROLL_API_URI, body: { warehouseId } })

const WAREHOUSES_KEY = 'warehouses_api'

export const useWarehouses = () => {
  const { data, error, isLoading, mutate: localMutate } = useSWR(WAREHOUSES_KEY, getWarehouses)

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

  const enroll = async ({ warehouseId }: { warehouseId: string }) => {
    const result = await enrollUserAtWarehouse(warehouseId)

    if (result.success) localMutate()

    return result
  }

  const unenroll = async ({ warehouseId }: { warehouseId: string }) => {
    const result = await unenrollUserFromWarehouse(warehouseId)

    if (result.success) localMutate()

    return result
  }

  return {
    warehouses: (data?.result.warehouses as Array<Warehouse>) || [],
    isLoading,
    error,
    create,
    enroll,
    unenroll
  }
}
