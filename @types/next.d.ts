import { User } from '@modules/user/user.model'
import type { IncomingMessage } from 'http'

declare module 'next' {
  export interface NextApiRequest extends IncomingMessage {
    user: User
  }
}
