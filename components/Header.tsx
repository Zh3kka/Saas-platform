import React from 'react'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import UserButton from './UserButton'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { MessagesSquareIcon } from 'lucide-react'
import CreateChatButton from './CreateChatButton'
import LanguageSelect from './LanguageSelect'

async function Header() {
  const session = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-4 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        {/* LOGO */}
        <Logo />

        <div className="flex-1 flex items-center justify-end space-x-4 mt-4 sm:mt-0">
          {/* Language select */}
          <LanguageSelect />

          {/* Session && (...) */}
          {session ? (
            <>
              <Link href={'/chat'} prefetch={false}>
                <MessagesSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreateChatButton isLarge={false} />
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}

          {/* Dark mode */}
          <DarkModeToggle />

          {/* User button */}
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  )
}

export default Header
