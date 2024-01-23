'use client'

import DeleteChatButton from './DeleteChatButton'
import InviteUser from './InviteUser'

function AdminControls({ chatId }: { chatId: string }) {
  return (
    <div className="flex space-x-2 m-5 justify-end sm:flex-row flex-col sm:space-y-0 space-y-3">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  )
}

export default AdminControls

// flex justify-end space-x-2 m-5 mb-0
