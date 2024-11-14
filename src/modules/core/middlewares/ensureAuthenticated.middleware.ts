import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import { UserUnauthorizedError } from '@errors'
// import { getToken } from 'next-auth/jwt'
// import { userControllers } from '@controllers'

export const ensureAuthenticated =
  <T>(handler: NextApiHandler<T>) =>
  async (req: NextApiRequest, res: NextApiResponse<T>) => {
    // const token = await getToken({ req })

    // if (!token?.email) {
    //   throw new UserUnauthorizedError({
    //     method: 'ensureAuthenticated - middleware',
    //     user: 'undefined',
    //     message: 'The request did not provide a valid session token'
    //   })
    // }

    // const retrievedUser = await userControllers.getByUsername(token.email)

    // if (!retrievedUser) {
    //   throw new UserUnauthorizedError({
    //     method: 'ensureAuthenticated - middleware',
    //     user: token.email,
    //     message: 'User does not exist'
    //   })
    // }

    // if (!retrievedUser.isEnabled) {
    //   throw new UserUnauthorizedError({
    //     method: 'ensureAuthenticated - middleware',
    //     user: token.email,
    //     message: 'User disabled'
    //   })
    // }

    // req.user = retrievedUser
    req.user = {
      id: 'testing-user-id',
      fullName: 'Jane Doe',
      email: 'jane@doe.com',
      active: true,
      disabled: false,
      role: 'volunteer',
      currentWarehouseId: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return await handler(req, res)
  }
