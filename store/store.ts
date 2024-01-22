import { create } from 'zustand'

export type LanguagesSupported = 'en' | 'de' | 'fr' | 'es' | 'hi' | 'ja' | 'la' | 'ru' | 'zh' | 'ar'

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
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

interface LanguageState {
    language: LanguagesSupported
    setLanguage: (language: LanguagesSupported) => void
    getLanguages: () => LanguagesSupported[]
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: 'en',
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: () => { return (Object.keys(LanguagesSupportedMap) as LanguagesSupported[]) },
}))