'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

function UpgradeBanner() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/register')}
      className="w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] text-center text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1] hover:shadow-md hover:opacity-75"
    >
      Unlock all features!
    </Button>
  )
}

export default UpgradeBanner
