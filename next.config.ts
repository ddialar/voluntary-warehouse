import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  i18n: {
    locales: ['es', 'ca', 'en'],
    defaultLocale: 'es'
  }
}

export default withNextIntl(nextConfig)
