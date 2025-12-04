'use client'

import React, { useEffect, useState } from 'react'
import CanteenCard from '@/components/CanteenCard'

const CanteensPage = () => {
  const [canteens, setCanteens] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedKeyword(keyword), 500)
    return () => clearTimeout(handler)
  }, [keyword])

  // Fetch canteens based on debounced keyword
  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        setLoading(true)
        const url =
          debouncedKeyword.trim() === ''
            ? '/api/canteens'
            : `/api/canteens?keyword=${debouncedKeyword}`

        const res = await fetch(url)
        const data = await res.json()
        setCanteens(data)
      } catch (err) {
        console.error('API error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCanteens()
  }, [debouncedKeyword])

  return (
    <div className="pt-[90px] pb-10 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Explore Canteens
        </h1>

        {/* Hero Search Section */}
        <div
          className="mb-12 relative rounded-xl overflow-hidden shadow-lg min-h-[200px] md:min-h-[400px]"
          style={{
            backgroundImage: `url('/system_icons/ydbu.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full px-4 py-10 md:py-30">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 text-center">
              Find Your Favorite Canteen
            </h2>
            <div className="w-full max-w-md">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search canteens..."
                className="
                  w-full
                  pl-4
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                  shadow-sm
                  placeholder-gray-400
                  bg-white/90
                  backdrop-blur-sm
                  transition
                  duration-200
                "
              />
            </div>

            {debouncedKeyword && !loading && canteens.length === 0 && (
              <p className="mt-3 text-gray-200 italic text-center">
                No results for &quot;
                <span className="font-semibold">{debouncedKeyword}</span> &quot;
              </p>
            )}
          </div>
        </div>

        {/* Canteens Grid */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="responsive-grid grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {canteens.map((canteen) => (
              <CanteenCard key={canteen.id} canteen={canteen} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CanteensPage
