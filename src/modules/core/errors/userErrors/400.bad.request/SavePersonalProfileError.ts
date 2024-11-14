import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.BAD_REQUEST
const message = 'Save personal profile error'

export class SavePersonalProfileError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
