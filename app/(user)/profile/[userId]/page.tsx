'use client'
import UserAvatar from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className="flex justify-center items-center space-x-4 sm:flex-row flex-col">
      <UserAvatar
        name={session?.user.name}
        image={session?.user.image}
        imageWidth={100}
        imageHeight={100}
        className="w-20 h-20"
      />
      <div className="flex flex-col space-y-4 items-center justify-center">
        <p className="font-medium">Name: {session?.user.name}</p>
        <p className="font-medium">Email: {session?.user.email}</p>
      </div>
      <Button variant="default" onClick={() => router.push('/chat')}>
        Go chat
      </Button>
    </div>
  )
}

export default ProfilePage
