import React, { useState } from 'react'

const SearchBox = ({
  placeholder = 'Search...',
  onSearch,
  buttonText = 'Search',
  realTimeSearch = false,
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (onSearch && !realTimeSearch) {
      onSearch(query)
    }
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    if (onSearch && realTimeSearch) {
      onSearch(newQuery)
    }
  }

  return (
    <div className="flex items-center justify-center bg-transparent">
      <form onSubmit={handleSubmit} className="flex items-center shadow-lg">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-[258px] py-[8px] pl-[16px] border border-black rounded-l-[8px] focus:outline-none"
        />

        <button
          type="submit"
          className="font-bold text-white bg-accent py-[8px] px-[16px] border border-t-black border-b-black border-r-black rounded-r-[8px]"
          disabled={realTimeSearch}
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}

export default SearchBox
