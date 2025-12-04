'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import SearchBox from '@/components/profile/SearchBox'
import FullScreenLoader from '@/components/FullScreenLoader'
import AdminUsersTable from '@/components/admin/AdminUsersTable'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

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

const InlineLoader = () => (
  <div className="flex justify-center items-center py-4 text-accent font-medium">
    Searching Users...
  </div>
)

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
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-10a5.25 5.25 0 00-1.75-3.873M20.9 16c-.46 0-.91-.12-1.3-.34m0 0a6 6 0 00-10.42 0M10.4 20h3.2"
      ></path>
    </svg>
    <h3 className="text-xl font-semibold text-gray-700">No Users Found</h3>
    {query ? (
      <p className="text-gray-500 mt-2">
        We couldn't find any users matching:{' '}
        <span className="font-bold text-red-500">"{query}"</span>.
      </p>
    ) : (
      <p className="text-gray-500 mt-2">
        There are currently no users registered.
      </p>
    )}
  </div>
)

const Page = () => {
  const { data: session, status } = useSession()
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [users, setUsers] = useState([])
  const [lastSearchQuery, setLastSearchQuery] = useState('')

  const fetchData = useCallback(async (keyword = '', isInitial = false) => {
    if (isInitial) {
      setIsInitialLoading(true)
    } else {
      setIsSearching(true)
    }

    setLastSearchQuery(keyword)

    try {
      const url = keyword
        ? `/api/users?keyword=${encodeURIComponent(keyword)}`
        : '/api/users'

      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setUsers(data)
    } catch (e) {
      console.error('Error fetching users:', e)
      setUsers([])
    } finally {
      if (isInitial) {
        setIsInitialLoading(false)
      } else {
        setIsSearching(false)
      }
    }
  }, [])

  const debouncedSearch = useMemo(
    () => debounce((keyword) => fetchData(keyword, false), 500),
    [fetchData]
  )

  useEffect(() => {
    fetchData('', true)
  }, [fetchData])

  if (status === 'loading' || isInitialLoading) {
    return <FullScreenLoader />
  }

  if (!session || session?.user?.role_id == 1) {
    redirect('/')
  } else if (session?.user?.role_id == 2) {
    redirect('/canteenOwner')
  }

  let content

  if (isSearching) {
    content = <InlineLoader />
  } else if (users.length === 0) {
    content = <NoResults query={lastSearchQuery} />
  } else {
    content = <AdminUsersTable users={users} />
  }

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
