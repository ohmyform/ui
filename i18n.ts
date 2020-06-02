import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"
import {resources} from './locales'

export const languages = [
  'de',
  'en',
]

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    defaultNS: 'common',
    react: {
      useSuspense: process.browser,
    }
  })
