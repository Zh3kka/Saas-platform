'use client'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React from 'react'

function ProfilePage() {
  const { data: session } = useSession()
  return (
    <div>
      <p>ID: {session?.user.id}</p>
      <p>Name: {session?.user.name}</p>
      <p>Email: {session?.user.email}</p>
    </div>
  )
}

export default ProfilePage
