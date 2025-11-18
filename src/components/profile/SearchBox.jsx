import React from 'react'

const SearchBox = () => {
  return (
    <div className="flex items-center justify-center bg-transparent">
      <form className="flex items-center shadow-lg">
        <input
          type="text"
          placeholder="Search by name"
          className="w-[258px]  py-[8px] pl-[16px] border border-black rounded-l-[8px] focus:outline-none"
        />
        <div>
          <button
            type="submit"
            className="font-bold text-white bg-accent py-[8px] px-[16px] border border-t-black border-b-black border-r-black rounded-r-[8px]"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
