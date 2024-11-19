import { UserWarehouseEnrollmentController } from '@modules/userWarehouseEnrollment/userWarehouseEnrollment.controller'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

const { OK } = StatusCodes

const enrollUserAtWarehouse = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  // TODO: Retrieve the user's id (maybe it could be handled in the ensureAuthenticated middleware)
  const userId = '2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b' // Testing user id
  // TODO: Check if the user is enabled (maybe it could be handled in the ensureAuthenticated middleware)

  // TODO: Validate the request payload
  const { warehouseId } = req.body as { warehouseId: string }

  await UserWarehouseEnrollmentController.enrollUserAtWarehouse({ userId, warehouseId })

  return res.status(OK).json({ success: true })
}

const unenrollUserFromWarehouse = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  // TODO: Retrieve the user's id (maybe it could be handled in the ensureAuthenticated middleware)
  const userId = '2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b' // Testing user id
  // TODO: Check if the user is enabled (maybe it could be handled in the ensureAuthenticated middleware)

  // TODO: Validate the request payload
  const { warehouseId } = req.body as { warehouseId: string }

  await UserWarehouseEnrollmentController.unenrollUserFromWarehouse({ userId, warehouseId })

  return res.status(OK).json({ success: true })
}

export const UserWarehouseEnrollmentHandler = {
  enrollUserAtWarehouse,
  unenrollUserFromWarehouse
}
