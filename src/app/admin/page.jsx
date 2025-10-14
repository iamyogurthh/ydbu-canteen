'use client'
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

function page() {
  const { data: session } = useSession()
  useEffect(() => {
    if (!session) {
      return
    }
  }, [])
  if (!session) {
    redirect('/')
    return null
  }

  return <div>For Statistics</div>
}

export default page
