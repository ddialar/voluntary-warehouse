import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { sendError } from 'next/dist/server/api-utils'
import type { CustomApiError } from '@errors'
import { NODE_ENV } from '@config'

export const handleHttpError = <T>(handler: NextApiHandler<T>) =>
  async (req: NextApiRequest, res: NextApiResponse<T>) => {
    try {
      return await handler(req, res)
    } catch (error) {
      const { statusCode, message } = <CustomApiError>error

      if (NODE_ENV === 'development') {
        const { description } = <CustomApiError>error
        // TODO (handle http error middleware) - Connect with Sentry and provide this information.
        console.log({ statusCode, message, description })
      }

      sendError(res, statusCode, message)
    }
  }
