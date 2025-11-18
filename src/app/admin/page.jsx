'use client'
import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import FullScreenLoader from '@/components/FullScreenLoader'

function page() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <FullScreenLoader />
  } else {
    if (!session) {
      redirect('/')
    } else if (session.user.role_id == 2) {
      redirect('/canteenOwner')
    } else {
      redirect('/admin/canteens')
    }
  }

  //  redirect only after status is "unauthenticated"
  if (status === 'unauthenticated') {
    // redirect('/')
  }

  return <div></div>
}

export default page
