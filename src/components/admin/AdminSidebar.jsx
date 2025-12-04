'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FullScreenLoader from '../FullScreenLoader'
import { signOut } from 'next-auth/react'
import AdminSidebarItems from './AdminSidebarItems'

const AdminSidebar = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return <FullScreenLoader />
  }

  if (!session) {
    return null
  }

  return (
    <div className="bg-white fixed top-0 bottom-0 w-[280px] shadow-md px-[12px] py-[16px] flex flex-col items-center justify-between">
      <div>
        <h1 className="text-[24px] font-bold">
          <span className="text-accent">YDBU</span> Online Canteen
        </h1>
        <p>Canteen Owner Dashboard</p>

        <span className="block border-1 border-[#D1D1D1] w-full my-[16px]"></span>

        <AdminSidebarItems />
      </div>
      <div className="flex flex-col w-full">
        <span className="block border-1 border-[#D1D1D1] w-full"></span>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          className="bg-accent text-white py-[10px] px-[68px] rounded-[24px] shadow-lg mt-[16px] cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
