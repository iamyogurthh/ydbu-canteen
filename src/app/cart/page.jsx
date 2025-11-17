import MyCartItemList from '@/components/cart/MyCartItemList'
import MyRecipes from '@/components/cart/MyRecipes'
import { getServerSession } from 'next-auth'
import React from 'react'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/dist/server/api-utils'

const page = async () => {
  const session = await getServerSession(OPTIONS)

  if (session?.user?.role_id == 2) {
    redirect('/canteenOwner')
  } else if (session.user.role_id == 3) {
    redirect('/admin')
  }
  return (
    <div
      className="
        pt-[88px] 
        px-[16px] 
        flex 
        flex-col           /* mobile: stacked */
        md:flex-row        /* desktop/tablet: side-by-side */
        items-start 
        justify-between 
        gap-[16px]
        w-full
      "
    >
      <MyCartItemList />

      <MyRecipes />
    </div>
  )
}

export default page
