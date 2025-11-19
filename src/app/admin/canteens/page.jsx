'use client'
import AdminCanteensTable from '@/components/admin/AdminCanteensTable'
import React, { useEffect, useState } from 'react'
import SearchBox from '@/components/profile/SearchBox'
import FullScreenLoader from '@/components/FullScreenLoader'
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const [canteens, setCanteens] = useState([])

  console.log(canteens)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/canteens')
        const data = await res.json()
        setCanteens(data)
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

  return (
    <div className="pt-[40px] px-[40px]">
      <div className="flex justify-center mb-4">
        <SearchBox />
      </div>
      <AdminCanteensTable />
    </div>
  )
}

export default page
