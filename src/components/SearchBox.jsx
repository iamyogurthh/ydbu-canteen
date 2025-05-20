import React from 'react'

const SearchBox = () => {
  return (
    <form className="relative flex items-center">
      <input
        placeholder="Search"
        className="w-[304px] h-[40px] rounded-[24px] pl-[16px] shadow-lg border-[2px] border-red-600"
      />
      <img
        src="/system_icons/search.png"
        alt="search"
        className="w-[24px] absolute right-[16px] hover:cursor-pointer"
      />
    </form>
  )
}

export default SearchBox
