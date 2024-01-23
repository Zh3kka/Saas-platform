'use client'

import { useSession } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import { useState } from 'react'
import useAdminId from '@/hooks/useAdminId'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'

function DeleteChatButton({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const adminId = useAdminId({ chatId })

  const handleDelete = async () => {
    toast({
      title: 'Deleting chat',
      description: 'Please wait while we delete the chat...',
      className: 'bg-red-600 text-white',
      duration: 3000,
    })

    await fetch('/api/chat/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: chatId,
      }),
    })
      .then(() => {
        toast({
          title: 'Chat Deleted',
          description: 'Your chat has been deleted.',
          className: 'bg-green-600 text-white',
          duration: 3000,
        })
        router.replace('/chat')
      })
      .finally(() => setOpen(false))
  }

  return (
    session?.user.id === adminId && (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-800">
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 space-x-2">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-800"
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}

export default DeleteChatButton
