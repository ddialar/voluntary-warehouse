import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@config'
import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

const getPreferredLanguage = (acceptLanguage: string): string => {
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality = 'q=1.0'] = lang.trim().split(';')
      const q = parseFloat(quality.split('=')[1])
      return { language: language.split('-')[0], q }
    })
    .sort((a, b) => b.q - a.q)

  return languages[0].language
}

export default getRequestConfig(async () => {
  const userLocale = (await headers()).get('Accept-Language')
  const preferredLanguage = userLocale ? getPreferredLanguage(userLocale) : DEFAULT_LOCALE
  const locale = AVAILABLE_LOCALES.includes(preferredLanguage) ? preferredLanguage : DEFAULT_LOCALE
  const messages = (await import(`./locales/${locale}.json`)).default

  return { locale, messages }
})
