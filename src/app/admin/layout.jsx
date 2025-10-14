import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/dist/server/api-utils'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import AdminSidebar from '@/components/admin/AdminSidebar'

const layout = async ({ children }) => {
  const session = await getServerSession(OPTIONS)
  if (!session) redirect('/')

  if (session.user.role_id !== 3) {
    redirect('/unauthorized')
  }

  return (
    <div className="flex">
      <div>
        <AdminSidebar />
      </div>
      <div className="pl-[280px]  w-full">{children}</div>
    </div>
  )
}

export default layout
