'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { useToast } from './ui/use-toast'
import useAdminId from '@/hooks/useAdminId'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { Input } from './ui/input'
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { getUserByEmailRef } from '@/lib/converters/User'
import { addChatRef } from '@/lib/converters/ChatMembers'
import ShareLink from './ShareLink'

const formShema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

function InviteUser({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const adminId = useAdminId({ chatId })
  const [open, setOpen] = useState(false)
  const [openInviteLink, setOpenInviteLink] = useState(false)

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formShema>) {
    if (!session?.user.id) return

    toast({
      title: 'Sending invite...',
      description: 'Please wait while we send the invite...',
      duration: 1000,
    })

    const querySnapshot = await getDocs(getUserByEmailRef(values.email))
    if (querySnapshot.empty) {
      toast({
        title: 'User not found',
        description:
          'Please enter a valid email address OR resend the invitation onve they have signed up!',
        variant: 'destructive',
      })
    } else {
      const user = querySnapshot.docs[0].data()

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || '',
      }).then(() => {
        setOpen(false)

        toast({
          title: 'Added to chat',
          description: 'The user has been added to the chat!',
          className: 'bg-green-600 text-white',
          duration: 3000,
        })
        setOpenInviteLink(true)
      })
    }

    form.reset()
  }

  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mt-1" />
              Add User to chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to chat</DialogTitle>
              <DialogDescription>
                Enter users email address to invite them to this chat!
                <br />
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registrated)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  )
}

export default InviteUser
