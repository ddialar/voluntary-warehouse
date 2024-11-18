import { CustomApiError } from '@modules/core/errors'
import { StatusCodes } from 'http-status-codes'

const statusCode = StatusCodes.NOT_FOUND
const message = 'Warehouse enrollment not found'

export class WarehouseEnrollmentNoFoundError extends CustomApiError {
  constructor(description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
