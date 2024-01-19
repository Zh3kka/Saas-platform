import { create } from 'zustand'

export type LanguageSupport = | 'en' | 'de' | 'fr' | 'es' | 'hi' | 'ja' | 'la' | 'ru' | 'zh' | 'ar'

export const LanguagesSupportedMap: Record<LanguageSupport, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    hi: 'Hindi',
    ja: 'Japanese',
    la: 'Latin',
    ru: 'Russian',
    zh: 'Chinese',
    ar: 'Arabic'
}

