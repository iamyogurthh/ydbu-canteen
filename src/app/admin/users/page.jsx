'use client'

import React, { useEffect, useState } from 'react'
import SearchBox from '@/components/profile/SearchBox'
import FullScreenLoader from '@/components/FullScreenLoader'
import AdminUsersTable from '@/components/admin/AdminUsersTable'
import { useSession } from 'next-auth/react'

const page = () => {
  const {data : session , status} = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  console.log(users)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  if (status === 'loading') {
    return <FullScreenLoader />
  } else {
    if (!session || session?.user?.role_id == 1) {
      redirect('/')
    } else if (session?.user?.role_id == 2) {
      redirect('/canteenOwner')
    }
  }

  // if (isLoading) {
  //   return <FullScreenLoader />
  // }
  return (
    <div className="pt-[40px] px-[40px]">
      <div className="flex justify-center mb-4">
        <SearchBox />
      </div>
      <AdminUsersTable users={users} />
    </div>
  )
}

export default page
