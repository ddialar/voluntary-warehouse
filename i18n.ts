import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@config'
import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

export default getRequestConfig(async () => {
  const userLocale = (await headers()).get('Accept-Language')
  const locale = userLocale && AVAILABLE_LOCALES.includes(userLocale) ? userLocale : DEFAULT_LOCALE
  const messages = (await import(`./locales/${locale}.json`)).default

  return { locale, messages }
})
