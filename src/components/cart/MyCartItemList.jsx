import React from 'react'
import MyCartItemListTable from './MyCartItemListTable'
const MyCartItemList = () => {
  return (
    <div className="bg-white rounded-[8px] shadow-md py-[16px] w-[60%]">
      <div className="flex items-center justify-center mb-[24px]">
        <img
          src="./system_icons/cart-red.png"
          alt="cart-icon"
          className="w-[32px] mr-[16px]"
        />
        <h1 className="text-[24px]">My Cart Items List</h1>
      </div>
      <MyCartItemListTable />
    </div>
  )
}

export default MyCartItemList
