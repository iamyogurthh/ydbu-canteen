import COSidebar from '@/components/canteenOwner/COSidebar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const layout = async ({ children }) => {
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
