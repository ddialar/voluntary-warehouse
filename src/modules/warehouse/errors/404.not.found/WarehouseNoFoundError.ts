import { CustomApiError } from '@modules/core/errors'
import { StatusCodes } from 'http-status-codes'

const statusCode = StatusCodes.NOT_FOUND
const message = 'Warehouse not found'

export class WarehouseNoFoundError extends CustomApiError {
  constructor(description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
