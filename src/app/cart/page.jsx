import MyCartItemList from '@/components/cart/MyCartItemList'
import MyRecipes from '@/components/cart/MyRecipes'
import React from 'react'

const page = () => {
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
