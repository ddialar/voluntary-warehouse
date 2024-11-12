import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { CustomApiError } from '../../CustomApiError'

const statusCode = StatusCodes.METHOD_NOT_ALLOWED
const message = ReasonPhrases.METHOD_NOT_ALLOWED

export class MethodNotAllowedError extends CustomApiError {
  constructor (description?: CustomApiError['description']) {
    super(statusCode, message, description)
  }
}
