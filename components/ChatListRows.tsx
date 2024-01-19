'use client'
import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from '@/lib/converters/ChatMembers'
import { useSession } from 'next-auth/react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function ChatListRows({ initialChats }: { initialChats: ChatMembers[] }) {
  const { data: session } = useSession()

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    { initialValue: initialChats }
  )
  return <div>ChatListRows</div>
}

export default ChatListRows
