import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

interface IUserAvatar {
  name?: string | null
  image?: string | null
  className?: string
  imageWidth?: number
  imageHeight?: number
}

const UserAvatar: FC<IUserAvatar> = ({
  name,
  image,
  className,
  imageWidth,
  imageHeight,
}) => {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
      {image && (
        <Image
          src={image}
          alt={name || 'User name'}
          width={imageWidth || 40}
          height={imageHeight || 40}
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
