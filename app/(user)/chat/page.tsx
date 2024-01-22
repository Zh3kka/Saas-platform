import ChatList from '@/components/ChatList'

type Props = {
  params: {}
  searchParams: {
    error: string
  }
}

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Your chats</h1>

      <ChatList />
    </div>
  )
}

export default ChatsPage
