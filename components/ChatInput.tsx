'use client'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { User, messagesRef } from '@/lib/converters/Messages'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const formShema = z.object({
  input: z.string().max(1000),
})

function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      input: '',
    },
  })

  function onSubmit(values: z.infer<typeof formShema>) {
    const inputCopy = values.input.trim()
    form.reset()
    if (inputCopy.length === 0) {
      return
    }
    if (!session?.user) {
      return
    }

    const userToStore: User = {
      id: session.user.id,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || '',
    }

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70 active:border-violet-600"
                    placeholder="Type a message..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChatInput
