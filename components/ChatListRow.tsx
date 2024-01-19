'use client'
import { Message, limitedSortedMessagesRef } from '@/lib/converters/Messages'
import { Skeleton } from './ui/skeleton'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function ChatListRow({ chatId }: { chatId: string }) {
  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  )

  function prettyUUID(n = 4) {
    return chatId.substring(0, n)
  }

  // const row = (message: Message) => (

  // )

  return (
    <div>
      {loading && (
        <div className="flex p-5 items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      )}

      {/* {messages?.length === 0 && !loading && row()} */}

      {/* {messages?.map((message) => row(message))} */}
    </div>
  )
}

export default ChatListRow
