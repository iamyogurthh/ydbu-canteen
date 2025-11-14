import React from 'react'

const SearchBox = () => {
  return (
    <form className="relative flex items-center w-full">
      <input
        placeholder="Search"
        className="
          w-full 
          max-w-full            /* allow full width in parent */
          md:max-w-[360px]      /* wider on desktop */
          h-[40px] 
          rounded-[24px] 
          pl-[16px] 
          pr-[48px]             /* enough space for icon */
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
      />
    </form>
  )
}

export default SearchBox
