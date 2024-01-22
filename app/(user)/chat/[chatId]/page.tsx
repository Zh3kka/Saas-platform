import { authOptions } from '@/auth'
import ChatInput from '@/components/ChatInput'
import { getServerSession } from 'next-auth'

async function ChatPage() {
  const session = await getServerSession(authOptions)
  return (
    <>
      {/* admin controls */}

      {/* chat members */}

      {/* chat messages */}

      {/* chat input */}
      <ChatInput chatId={chatId} />
    </>
  )
}

export default ChatPage
