import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.BAD_REQUEST
const message = 'User already exists'

export class UserAlreadyExistsError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
