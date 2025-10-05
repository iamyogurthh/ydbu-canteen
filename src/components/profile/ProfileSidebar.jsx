'use client'

import React, { useEffect, useState } from 'react'
import ProfileSidebarItem from './ProfileSidebarItem'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FullScreenLoader from '../FullScreenLoader'

const ProfileSidebar = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') return <FullScreenLoader /> // or a loader

  if (!session) return null

  return (
    <div className="bg-white fixed top-0 bottom-0 w-[280px] shadow-md px-[16px] pt-[100px] flex flex-col items-center">
      <ProfileSidebarItem role_id={session.user.role_id} />
    </div>
  )
}

export default ProfileSidebar
