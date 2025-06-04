import React from 'react'
import SearchBox from '@/components/profile/SearchBox'

import ShopDashboardTable from './ShopDashboardTable'

const ShopDashboardPage = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <SearchBox />
      </div>
      <ShopDashboardTable />
    </div>
  )
}

export default ShopDashboardPage
