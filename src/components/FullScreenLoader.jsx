import React from 'react'

const FullScreenLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#00000046] bg-opacity-80 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-opacity-75 mb-6"></div>
      <p className="text-red-600 text-lg font-semibold">{message}</p>
    </div>
  )
}

export default FullScreenLoader
