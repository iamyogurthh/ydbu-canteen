'use client'

import React, { useEffect } from 'react'
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

  if (status === 'loading') return <FullScreenLoader />
  if (!session) return null

  return (
    <div
      className="
        bg-white 
        fixed 
        top-[70px] 
        bottom-0 
        w-[240px] 
        shadow-md 
        px-[16px] 
        pt-[40px] 
        flex-col 
        items-center
        hidden md:flex     /* hide on mobile, show on md+ */
      "
    >
      <ProfileSidebarItem role_id={session.user.role_id} />
    </div>
  )
}

export default ProfileSidebar
