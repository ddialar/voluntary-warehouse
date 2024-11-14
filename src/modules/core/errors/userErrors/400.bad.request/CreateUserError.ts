import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.BAD_REQUEST
const message = 'There was an error creating the user'

export class CreateUserError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
