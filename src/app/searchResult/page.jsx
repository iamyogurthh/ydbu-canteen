import React from 'react'

const Page = ({ searchParams }) => {
  const query = searchParams?.search || ''

  return (
    <div
      className="
        mt-24 
        px-4               /* Mobile padding */
        sm:px-8            /* Small screens */
        md:px-16           /* Tablets */
        lg:px-32           /* Laptops */
        xl:px-40           /* Large screens */
      "
    >
      <p className="text-gray-600 text-lg mb-6">
        Showing results for:{' '}
        <span className="font-semibold text-red-600">
          {query || 'Nothing searched'}
        </span>
      </p>
    </div>
  )
}

export default Page
