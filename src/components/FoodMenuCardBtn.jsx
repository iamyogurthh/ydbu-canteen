'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import React from 'react'

const FoodMenuCardBtn = ({ foodId }) => {
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart()
  const quantity = getItemQuantity(foodId)
  return (
    <div className="flex justify-center items-center">
      {quantity <= 0 ? (
        <button
          onClick={() => increaseCartQuantity(foodId)}
          className="border-2 px-[20px] py-[6px] rounded-[24px] cursor-pointer "
        >
          <img src="/system_icons/cart.png" alt="cart" className="w-[24px]" />
        </button>
      ) : (
        <div className="flex items-center justify-between gap-[16px]">
          <button
            onClick={() => increaseCartQuantity(foodId)}
            className="text-[24px] cursor-pointer border px-[14px] py-[2px] rounded-[8px]"
          >
            +
          </button>
          <p className="border py-[8px] px-[16px] text-[16px] rounded-[8px]">
            {quantity}
          </p>
          <button
            onClick={() => decreaseCartQuantity(foodId)}
            className="text-[24px] cursor-pointer border px-[16px] py-[2px] rounded-[8px]"
          >
            -
          </button>
        </div>
      )}
    </div>
  )
}

export default FoodMenuCardBtn
