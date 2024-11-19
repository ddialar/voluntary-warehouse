import {
  WAREHOUSE_API_URI,
  WAREHOUSE_ENROLL_API_URI,
  WAREHOUSE_SWITCH_API_URI,
  WAREHOUSE_UNENROLL_API_URI
} from '@config'
import { get, post, put } from '@fetcher'
import { MapWarehouse, NewWarehousePayload, Warehouse } from '@modules/warehouse/warehouse.model'
import useSWR, { mutate } from 'swr'

const getWarehouses = async () => get<{ warehouses: Array<MapWarehouse> }>({ url: WAREHOUSE_API_URI })

const createWarehouse = async (data: NewWarehousePayload) =>
  post<MapWarehouse, NewWarehousePayload>({ url: WAREHOUSE_API_URI, body: data })

const enrollUserAtWarehouse = async (body: { warehouseId: string }) =>
  post<unknown, { warehouseId: string }>({ url: WAREHOUSE_ENROLL_API_URI, body })

const unenrollUserFromWarehouse = async (body: { warehouseId: string }) =>
  put<unknown, { warehouseId: string }>({ url: WAREHOUSE_UNENROLL_API_URI, body })

const switchWarehouseEnrollment = async (body: { prevWarehouseId: string; nextWarehouseId: string }) =>
  post<unknown, { prevWarehouseId: string; nextWarehouseId: string }>({ url: WAREHOUSE_SWITCH_API_URI, body })

const WAREHOUSES_KEY = 'warehouses_api'

export const useWarehouses = () => {
  const {
    data,
    error,
    isLoading,
    mutate: localMutate
  } = useSWR<Awaited<ReturnType<typeof getWarehouses>>>(WAREHOUSES_KEY, getWarehouses)

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
    const result = await enrollUserAtWarehouse({ warehouseId })

    if (result.success) localMutate()

    return result
  }

  const unenroll = async ({ warehouseId }: { warehouseId: string }) => {
    const result = await unenrollUserFromWarehouse({ warehouseId })

    if (result.success) localMutate()

    return result
  }

  const switchEnrollment = async ({
    prevWarehouseId,
    nextWarehouseId
  }: {
    prevWarehouseId: string
    nextWarehouseId: string
  }) => {
    const result = await switchWarehouseEnrollment({
      prevWarehouseId,
      nextWarehouseId
    })

    if (result.success) localMutate()

    return result
  }

  return {
    warehouses: (data?.result.warehouses as Array<Warehouse>) || [],
    isLoading,
    error,
    create,
    enroll,
    unenroll,
    switchEnrollment,
    enrolledWarehouse:
      data?.result && data.result.warehouses
        ? (data.result.warehouses as Array<MapWarehouse>).find(({ isEnrolled }) => isEnrolled)
        : null
  }
}
