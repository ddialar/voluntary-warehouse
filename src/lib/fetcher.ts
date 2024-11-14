import { BASE_URL } from '@config'
import { StatusCodes } from 'http-status-codes'
import { URLSearchParams } from 'url'

type Headers = { [key: string]: string }

export interface FetcherResult<T> {
  success: boolean
  statusCode: Response['status']
  result: T | Record<string, unknown>
}

const responseBuilder = async <T>(response: Response | Error): Promise<FetcherResult<T>> => {
  return 'message' in response
    ? {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        result: { result: response.message }
      }
    : {
        success: response.ok,
        statusCode: response.status,
        result: response.ok ? ({ ...(await response.json()) } as T) : { result: response.statusText }
      }
}

interface GetProps {
  url: string
  headers?: Headers
  searchParams?:
    | string
    | URLSearchParams
    | Record<string, string | readonly string[]>
    | Iterable<[string, string]>
    | readonly [string, string][]
    | undefined
}
export const get = async <T>({ url, searchParams, headers }: GetProps) => {
  const requestUrl = `${url}${searchParams ? new URLSearchParams(searchParams).toString() : ''}`
  console.log({ method: 'fetcher GET', requestUrl: new URL(requestUrl, BASE_URL).toString() })

  const response = await fetch(new URL(requestUrl, BASE_URL).toString(), {
    method: 'GET',
    headers: {
      ...headers,
      Accept: 'application/json'
    }
  }).catch(error => error)
  return await responseBuilder<T>(response)
}

interface PostProps<K> {
  url: string
  body: K
  headers?: Headers
}
export const post = async <T, K>({ url, body, headers }: PostProps<K>) => {
  console.log({ method: 'fetcher POST', requestUrl: new URL(url, BASE_URL).toString() })

  const response = await fetch(new URL(url, BASE_URL).toString(), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(error => error)

  return await responseBuilder<T>(response)
}

interface PutProps<K> {
  url: string
  body: K
  headers?: Headers
}
export const put = async <T, K>({ url, body, headers }: PutProps<K>) => {
  const response = await fetch(new URL(url, BASE_URL).toString(), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(error => error)

  return await responseBuilder<T>(response)
}

interface DeleteProps {
  url: string
  headers?: Headers
}
export const deleteRequest = async ({ url, headers }: DeleteProps) => {
  const response = await fetch(new URL(url, BASE_URL).toString(), {
    method: 'DELETE',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(error => error)

  return await responseBuilder(response)
}
