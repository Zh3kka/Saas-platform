'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import { Session } from 'next-auth'
import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function UserButton({ session }: { session: Session | null }) {
  const router = useRouter()
  if (!session)
    return (
      <Button variant={'outline'} onClick={() => signIn()}>
        Sign In
      </Button>
    )
  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={session.user?.name} image={session.user?.image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Welcome, {session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/profile/${session.user.id}`)}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}

export default UserButton
