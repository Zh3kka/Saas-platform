'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useToast } from './ui/use-toast'
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
import { Check, Copy } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'

function ShareLink({
  isOpen,
  setIsOpen,
  chatId,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  chatId: string
}) {
  const { toast } = useToast()
  const host = window.location.host
  const [isCopy, setIsCopy] = useState(false)
  const linkToChat =
    process.env.NODE_ENV === 'development'
      ? `http://${host}/chat/${chatId}`
      : `https://${host}/chat/${chatId}`

  async function copyToClipboard() {
    try {
      setIsCopy(true)
      await navigator.clipboard.writeText(linkToChat)

      toast({
        title: 'Copied Successfully',
        description: 'Share this to the person you want to invite them!',
        className: 'bg-green-600 text-white',
        duration: 3000,
      })
    } catch (error) {
      console.error('Failed to copy to clipboard', error)
    }
  }
  return (
    <Dialog
      onOpenChange={(open) => setIsOpen(open)}
      open={isOpen}
      defaultOpen={isOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy className="mr-2" />
          Share Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Any user wgo gas been{' '}
            <span className="text-indigo-600 font-bold">granted access</span>{' '}
            can use this link
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipboard()}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            {!isCopy ? (
              <Copy className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-red-600"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareLink
