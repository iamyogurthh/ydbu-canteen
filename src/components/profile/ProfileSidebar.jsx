import React from 'react'
import ProfileSidebarItem from './ProfileSidebarItem'
import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

const ProfileSidebar = async () => {
  const session = await getServerSession(OPTIONS)
  if (!session) {
    redirect('/')
  }

  console.log(session)

  return (
    <div className="bg-white fixed top-0 bottom-0 w-[280px] shadow-md px-[16px] pt-[100px] flex flex-col items-center">
      <ProfileSidebarItem role_id={session.user.role_id} />
    </div>
  )
}

export default ProfileSidebar
