import MyCartItemList from '@/components/cart/MyCartItemList'
import MyRecipes from '@/components/cart/MyRecipes'
import React from 'react'

const page = () => {
  return (
    <div className="pt-[88px] px-[16px] flex items-start justify-between gap-[16px]">
      <MyCartItemList />
      <MyRecipes />
    </div>
  )
}

export default page
