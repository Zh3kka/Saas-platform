import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/" className="overflow-hidden" prefetch={false}>
      <div className="flex item-center ">
        <h1 className="dark:text-white font-bold text-2xl">ZhekaChat</h1>
      </div>
    </Link>
  )
}

export default Logo
