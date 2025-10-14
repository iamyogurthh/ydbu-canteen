import React from 'react'
import SearchBox from '@/components/profile/SearchBox'

import ShopDashboardTable from '../../../components/profile/shopDashboard/ShopDashboardTable'
import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const ShopDashboardPage = async () => {
  const session = await getServerSession(OPTIONS)

  const orders = await fetch(
    `http://localhost:3000/api/admin/canteens/${session.user.canteen_id}/orders/users`
  )
    .then((response) => response.json())
    .then((data) => data)

  return (
    <div className="pt-[40px] px-[40px]">
      <div className="flex justify-center mb-4">
        <SearchBox />
      </div>
      <ShopDashboardTable
        orders={orders}
        canteen_id={session.user.canteen_id}
      />
    </div>
  )
}

export default ShopDashboardPage
