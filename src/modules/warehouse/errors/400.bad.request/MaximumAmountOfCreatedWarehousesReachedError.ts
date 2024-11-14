import { CustomApiError } from '@modules/core/errors'
import { StatusCodes } from 'http-status-codes'

const statusCode = StatusCodes.BAD_REQUEST
const message = 'You cannot create more warehouses today'

export class MaximumAmountOfCreatedWarehousesReachedError extends CustomApiError {
  constructor(description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
