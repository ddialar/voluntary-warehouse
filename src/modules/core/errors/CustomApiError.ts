import { ApiError } from 'next/dist/server/api-utils'

interface ICustomApiError {
  status: number
  message: string
  description?: Record<string, string | boolean | number | Record<string, unknown>>
}

export class CustomApiError extends ApiError implements ICustomApiError {
  constructor (
    public status: ICustomApiError['status'],
    public message: ICustomApiError['message'],
    public description: ICustomApiError['description']
  ) {
    super(status, message)
  }
}
