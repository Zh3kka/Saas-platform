import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

interface IUserAvatar {
  name?: string | null
  image?: string | null
  className?: string
}

const UserAvatar: FC<IUserAvatar> = ({ name, image, className }) => {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
      {image && (
        <Image
          src={image}
          alt={name || 'User name'}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <AvatarFallback
        delayMs={1000}
        className="dark:bg-white dark:text-black text-lg"
      >
        {name
          ?.split(' ')
          .map((n) => n[0].toUpperCase() + n[1].toUpperCase())
          .join('')}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
