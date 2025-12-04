'use client'
import AdminCanteensTable from '@/components/admin/AdminCanteensTable'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import SearchBox from '@/components/profile/SearchBox'
import FullScreenLoader from '@/components/FullScreenLoader'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

// Utility function for debouncing (Keep this the same)
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

// --- Inline Loader Component (Keep this the same) ---
const InlineLoader = () => (
  <div className="flex justify-center items-center py-4 text-accent font-medium">
    Searching...
  </div>
)
// --------------------------------------------------

// --- NEW No Results Component ---
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
    <h3 className="text-xl font-semibold text-gray-700">No Canteens Found</h3>
    {query ? (
      <p className="text-gray-500 mt-2">
        We couldn't find any canteens matching:{' '}
        <span className="font-bold text-red-500">"{query}"</span>.
      </p>
    ) : (
      <p className="text-gray-500 mt-2">There are no canteens registered.</p>
    )}
  </div>
)
// --------------------------------------------------

const Page = () => {
  const { data: session, status } = useSession()
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [canteens, setCanteens] = useState([])
  // New state to store the last search query for the "No Results" message
  const [lastSearchQuery, setLastSearchQuery] = useState('')

  // Function to fetch data, accepts an optional keyword for searching
  const fetchData = useCallback(async (keyword = '', isInitial = false) => {
    if (isInitial) {
      setIsInitialLoading(true)
    } else {
      setIsSearching(true)
    }

    // Store the keyword before the fetch starts
    setLastSearchQuery(keyword)

    try {
      // Construct the URL with the keyword
      const url = keyword
        ? `/api/canteens/self?keyword=${encodeURIComponent(keyword)}`
        : '/api/canteens/self'

      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setCanteens(data)
    } catch (e) {
      console.error('Error fetching canteens:', e)
      setCanteens([])
    } finally {
      if (isInitial) {
        setIsInitialLoading(false)
      } else {
        setIsSearching(false)
      }
    }
  }, [])

  // Memoized and Debounced Search Handler
  const debouncedSearch = useMemo(
    // We pass the keyword only, setting isInitial to false implicitly
    () => debounce((keyword) => fetchData(keyword, false), 500),
    [fetchData]
  )

  // Initial data fetch on component mount
  useEffect(() => {
    // Pass true to indicate this is the initial load
    fetchData('', true)
  }, [fetchData])

  // --- Authentication and Authorization Checks ---
  if (status === 'loading' || isInitialLoading) {
    return <FullScreenLoader />
  }

  if (!session) {
    redirect('/')
  }

  if (session?.user?.role_id == 1) {
    redirect('/')
  } else if (session?.user?.role_id == 2) {
    redirect('/canteenOwner')
  }

  // --- Conditional Content Rendering ---
  let content

  if (isSearching) {
    // 1. Show loader while searching
    content = <InlineLoader />
  } else if (canteens.length === 0) {
    // 2. Show No Results message if search is complete and array is empty
    content = <NoResults query={lastSearchQuery} />
  } else {
    // 3. Show the table if search is complete and results are present
    content = <AdminCanteensTable canteens={canteens} />
  }

  // --- Main Render ---
  return (
    <div className="pt-[40px] px-[40px]">
      <div className="flex justify-center mb-4">
        <SearchBox onSearch={debouncedSearch} realTimeSearch={true} />
      </div>

      {content}
    </div>
  )
}

export default Page
