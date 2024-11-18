import { MethodNotAllowedError } from '@errors'
import { ensureAuthenticated, handleHttpError } from '@modules/core/middlewares'
import { WarehouseHandler } from '@modules/warehouse/warehouse.handler'
import type { NextApiRequest, NextApiResponse } from 'next'

const actions: Partial<Record<HTTP_REQUESTS.AllowedVerbs, HTTP_REQUESTS.HandlerFunction>> = {
  GET: WarehouseHandler.getWarehouses,
  POST: WarehouseHandler.createWarehouse
}

export default handleHttpError(
  ensureAuthenticated(async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as HTTP_REQUESTS.AllowedVerbs
    if (method in actions) {
      return actions[method]!(req, res)
    }
    throw new MethodNotAllowedError()
  })
)
