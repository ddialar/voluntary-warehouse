import { MethodNotAllowedError } from '@errors'
import { ensureAuthenticated, handleHttpError } from '@modules/core/middlewares'
import { UserWarehouseEnrollmentHandler } from '@modules/userWarehouseEnrollment/userWarehouseEnrollment.handler'
import type { NextApiRequest, NextApiResponse } from 'next'

const actions: Partial<Record<HTTP_REQUESTS.AllowedVerbs, HTTP_REQUESTS.HandlerFunction>> = {
  PUT: UserWarehouseEnrollmentHandler.unenrollUserFromWarehouse
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
