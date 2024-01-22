'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
} from '@/store/store'
import { usePathname } from 'next/navigation'

function LanguageSelect() {
  const [language, setLanguage, getLanguages] = useLanguageStore((state) => [
    state.language,
    state.setLanguage,
    state.getLanguages,
  ])

  const pathName = usePathname()
  const isChatPage = pathName.includes('/chat')
  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            {getLanguages().map((language) => (
              <SelectItem key={language} value={language}>
                {LanguagesSupportedMap[language]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  )
}

export default LanguageSelect
