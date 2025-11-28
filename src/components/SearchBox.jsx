'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchBox = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    if (!searchText.trim()) return
    router.push(`/searchResult?search=${encodeURIComponent(searchText)}`)
  }

  return (
    <form className="relative flex items-center w-full" onSubmit={handleClick}>
      <input
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="
          w-full 
          max-w-full
          md:max-w-[360px]
          h-[40px] 
          rounded-[24px] 
          pl-[16px] 
          pr-[48px]
          shadow-lg 
          border-[2px] 
          border-red-600
          text-sm
          focus:outline-none
        "
      />
      <img
        src="/system_icons/search.png"
        alt="search"
        className="
          w-[20px] md:w-[24px]
          absolute
          right-4 
          md:right-[40px] 
          top-1/2 
          -translate-y-1/2 
          cursor-pointer
        "
        onClick={handleClick}
      />
    </form>
  )
}

export default SearchBox
