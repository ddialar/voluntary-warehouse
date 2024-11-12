// import nextauth from 'next-auth/react'
// import httpMocks from 'node-mocks-http'
// import { getSpeakersFixture } from '@testingData'
// import { ensureAuthenticated } from '../ensureAuthenticated.middleware'
// import type { NextApiRequest, NextApiResponse } from 'next'

describe('Middelwares - ensureAuthenticated', () => {
  it.todo('implement the case for authenticated user')
  it.todo('implement the case for non registered user')
  it.todo('implement the case for non enabled user')
})

export {}
// describe('Middelwares - ensureAuthenticated', () => {
//   const handler = jest.fn()
//   const [selectedUser] = getSpeakersFixture()

//   afterAll(() => {
//     jest.resetAllMocks()
//   })

//   it('runs the provided handler', async () => {
//     jest.mock('next-auth/react', () => {
//       const originalModule = jest.requireActual('next-auth/react')

//       return {
//         __esModule: true,
//         ...originalModule,
//         getSession: jest.fn(() => ({
//           session: {
//             user: { email: 'testing@email' }
//           },
//           expires: (new Date()).toISOString()
//         }))
//       }
//     })

//     const mockReq = httpMocks.createRequest<NextApiRequest>()
//     const mockRes = httpMocks.createResponse<NextApiResponse>()

//     await (ensureAuthenticated(handler))(mockReq, mockRes)

//     expect(handler).toHaveBeenCalledWith()
//   })
// })
