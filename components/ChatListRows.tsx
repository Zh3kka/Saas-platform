'use client'
import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from '@/lib/converters/ChatMembers'
import { MessageSquare } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import CreateChatButton from './CreateChatButton'
import ChatListRow from './ChatListRow'
import { Skeleton } from './ui/skeleton'

function ChatListRows({ initialChats }: { initialChats: ChatMembers[] }) {
  const { data: session } = useSession()

  const [members, loading, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    { initialValue: initialChats }
  )

  if (loading) {
    return (
      <div className="flex p-5 items-center space-x-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    )
  }

  if (members?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-40 space-y-2">
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">
          Lets get you started by creating your first chat!
        </h2>
        <CreateChatButton isLarge />
      </div>
    )
  }

  // Return the list of members
  return (
    <div>
      {members?.map((member, i) => (
        <ChatListRow key={member.chatId} chatId={member.chatId} />
      ))}
    </div>
  )
}

export default ChatListRows
