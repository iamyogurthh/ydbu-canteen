'use client'

import { useSession } from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'
import FoodMenuCard from '@/components/FoodMenuCard'

const Page = () => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const keyword = searchParams.get('search') || ''

  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)

  // -------------------------
  // AUTH CHECK (MOVED TO useEffect)
  // -------------------------
  useEffect(() => {
    if (status === 'loading') return

    if (session?.user?.role_id == 2) {
      redirect('/canteenOwner')
    }

    if (session?.user?.role_id == 3) {
      redirect('/admin')
    }
  }, [session, status])

  // -------------------------
  // FETCH MENUS
  // -------------------------
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`/api/menus?keyword=${keyword}`)
        const data = await res.json()
        setMenus(data)
      } catch (error) {
        console.error('Search API error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (keyword) fetchMenus()
    else setLoading(false)
  }, [keyword])

  // -------------------------
  // LOADING
  // -------------------------
  if (status === 'loading' || loading) {
    return <FullScreenLoader />
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="mt-24 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
      <p className="text-gray-600 text-lg mb-6">
        Showing results for:{' '}
        <span className="font-semibold text-red-600">
          {keyword || 'Nothing searched'}
        </span>
      </p>

      {menus.length === 0 ? (
        <p className="text-gray-500 text-lg">No menus found.</p>
      ) : (
        <div className=" responsive-grid">
          {menus.map((menu, index) => (
            <FoodMenuCard
              key={index}
              food={menu}
              canteen_name={menu.canteen_name}
              showCanteenName={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
