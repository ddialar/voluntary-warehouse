import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.NOT_FOUND
const message = 'User not found'

export class UserNotFoundError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
