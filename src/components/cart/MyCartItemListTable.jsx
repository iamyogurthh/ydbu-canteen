'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import React from 'react'
import MyCartItemListTableItem from './MyCartItemListTableItem'

const MyCartItemListTable = () => {
  const { cartItems } = useShoppingCart()
  console.log(cartItems)
  return (
    <table className="w-full table-fixed">
      <thead className="border-t border-b">
        <tr className="text-left">
          <th className="w-[40%] pl-[24px] py-[18px] text-left">Item Name</th>
          <th className="w-[10%] py-[18px] text-center">Quantity</th>
          <th className="py-[18px]  text-right">Price</th>
          <th className="py-[18px] text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <MyCartItemListTableItem item={item} key={index} />
          ))
        ) : (
          <tr>
            <td className="py-[16px] px-[24px] flex items-center gap-[16px] ">
              <div className="font-bold text-accent ">
                No item in the cart yet
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default MyCartItemListTable
