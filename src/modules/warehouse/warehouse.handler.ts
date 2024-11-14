import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import { WarehouseController } from './warehouse.controller'

const { OK } = StatusCodes

const createWarehouse = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  // export const createWarehouse = async ({ name, location, userId }: CreateWarehouseProps): Promise<void> => {
  // TODO: Retrieve the user's id (maybe it could be handled in the ensureAuthenticated middleware)
  const userId = 'testing-user-id'
  // TODO: Check if the user is enabled (maybe it could be handled in the ensureAuthenticated middleware)

  const payload = req.body as { name: string; lat: number; lng: number }
  // TODO: Validate the request payload

  console.dir({ method: 'createWarehouse handler', payload, userId }, { depth: null })

  const warehouse = await WarehouseController.createWarehouse({ ...payload, userId })

  return res.status(OK).json(warehouse)
}

const getWarehouses = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  // export const createWarehouse = async ({ name, location, userId }: CreateWarehouseProps): Promise<void> => {
  // TODO: Retrieve the user's id (maybe it could be handled in the ensureAuthenticated middleware)
  const userId = 'testing-user-id'
  // TODO: Check if the user is enabled (maybe it could be handled in the ensureAuthenticated middleware)

  console.dir({ method: 'getWarehouses handler', userId }, { depth: null })

  const warehouses = await WarehouseController.getWarehouses()

  return res.status(OK).json({ warehouses })
}

export const WarehouseHandler = {
  createWarehouse,
  getWarehouses
}
