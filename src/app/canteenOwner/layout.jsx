import COSidebar from '@/components/canteenOwner/COSidebar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const layout = async ({ children }) => {
  const session = await getServerSession(OPTIONS)
  if (!session) redirect('/')

  if (session.user.role_id !== 2) {
    redirect('/')
  }
  return (
    <div className="flex">
      <div>
        <COSidebar />
      </div>
      <div className="pl-[280px]  w-full">{children}</div>
    </div>
  )
}

export default layout
