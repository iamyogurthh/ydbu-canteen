'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ShopDashboardTable from '../../../components/profile/shopDashboard/ShopDashboardTable'
import FullScreenLoader from '@/components/FullScreenLoader'
import SearchBox from '@/components/profile/SearchBox'

// --- Utility function for debouncing ---
const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

// --- Inline Loader Component for search ---
const InlineLoader = () => (
  <div className="flex justify-center items-center py-4 text-gray-700 font-medium">
    Searching Orders...
  </div>
)

// --- No Results Component ---
const NoResults = ({ query }) => (
  <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
    <svg
      className="w-16 h-16 text-gray-400 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <h3 className="text-xl font-semibold text-gray-700">No Orders Found</h3>
    {query ? (
      <p className="text-gray-500 mt-2">
        We couldn't find any orders matching:{' '}
        <span className="font-bold text-red-500">"{query}"</span>.
      </p>
    ) : (
      <p className="text-gray-500 mt-2">
        There are currently no orders for your canteen.
      </p>
    )}
  </div>
)

const ShopDashboardPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [orders, setOrders] = useState(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [lastSearchQuery, setLastSearchQuery] = useState('')

  // 1. Authorization and Redirection based on session status
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/')
    } else if (session?.user?.role_id === 1) {
      router.push('/')
    } else if (session?.user?.role_id === 3) {
      router.push('/admin')
    }
    // Note: We only set isInitialLoading to false after the first successful data fetch below.
  }, [status, session, router])

  // 2. Data Fetching Function (Handles initial load and search)
  const fetchData = useCallback(
    async (keyword = '', isInitial = false) => {
      // Only proceed if we have a session and the necessary data
      if (!session || !session.user?.canteen_id) return

      if (isInitial) {
        setIsInitialLoading(true)
      } else {
        setIsSearching(true)
      }

      setLastSearchQuery(keyword)

      try {
        // Use a relative path for the API call
        const baseUrl = `/api/admin/canteens/${session.user.canteen_id}/orders/users`
        const url = keyword
          ? `${baseUrl}?keyword=${encodeURIComponent(keyword)}`
          : baseUrl

        const res = await fetch(url)

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        setOrders(data)
      } catch (e) {
        console.error('Error fetching orders:', e)
        setOrders([])
      } finally {
        setIsInitialLoading(false)
        setIsSearching(false)
      }
    },
    [session]
  )

  // 3. Memoized and Debounced Search Handler
  const debouncedSearch = useMemo(
    // Calls fetchData with the keyword and sets isInitial to false (for search)
    () => debounce((keyword) => fetchData(keyword, false), 500),
    [fetchData]
  )

  // 4. Initial data fetch
  useEffect(() => {
    if (session?.user?.canteen_id) {
      // Pass true to trigger initial loading state
      fetchData('', true)
    }
  }, [session, fetchData])

  // --- Render Logic ---
  // Show full screen loader during auth check OR initial data fetching
  if (status === 'loading' || isInitialLoading || !session) {
    return <FullScreenLoader />
  }

  // --- Conditional Content Rendering ---
  let content

  if (isSearching) {
    content = <InlineLoader />
  } else if (!orders || orders.length === 0) {
    content = <NoResults query={lastSearchQuery} />
  } else {
    // Show the table if search is complete and results are present
    content = (
      <ShopDashboardTable
        orders={orders}
        canteen_id={session.user.canteen_id}
      />
    )
  }

  return (
    <div className="pt-[40px] px-[40px]">
      <div className="flex justify-center mb-4">
        <SearchBox
          onSearch={debouncedSearch}
          realTimeSearch={true}
          placeholder={'Search order'}
        />
      </div>

      {content}
    </div>
  )
}

export default ShopDashboardPage
