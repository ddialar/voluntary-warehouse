import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.BAD_REQUEST
const message = 'The user personal profile is not successfuly filled in'

export class UserPersonalProfileDoesNotExistError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
