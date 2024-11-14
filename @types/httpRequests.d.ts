declare namespace HTTP_REQUESTS {
  type AllowedVerbs = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  type HandlerFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>
}
