'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import LoaderSpinner from './LoaderSpinner'
import { v4 as uuidv4 } from 'uuid'
import { serverTimestamp, setDoc } from 'firebase/firestore'
import { addChatRef } from '@/lib/converters/ChatMembers'

function CreateChatButton({ isLarge }: { isLarge: boolean }) {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const createNewChat = async () => {
    if (!session?.user.id) return null

    setLoading(true)
    toast({
      title: 'Creating new chat...',
      description: 'Hold tight while we are creating a new chat...',
      duration: 3000,
    })

    const chatId = uuidv4()

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || '',
    })
      .then(() => {
        toast({
          title: 'Chat created!',
          description: 'You are now a member of this chat.',
          className: 'bg-green-600 text-white',
          duration: 2000,
        })
        router.push(`/chat/${chatId}`)
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: 'Failed to create chat!',
          description: 'Please try again.',
          duration: 2000,
          variant: 'destructive',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (isLarge)
    return (
      <div>
        <Button variant="default" onClick={createNewChat}>
          {loading ? <LoaderSpinner /> : 'Create a new chat'}
        </Button>
      </div>
    )
  return (
    <Button onClick={createNewChat} variant={'ghost'}>
      <MessageSquarePlusIcon />
    </Button>
  )
}

export default CreateChatButton
