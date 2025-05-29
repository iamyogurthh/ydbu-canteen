'use client'
import React from 'react'
import { useShoppingCart } from '@/context/ShoppingCartContext'

const CartQuantityControls = ({ foodId }) => {
  const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity } =
    useShoppingCart()
  const quantity = getItemQuantity(foodId)
  return (
    <div className="flex items-center justify-between gap-[24px]">
      <button
        onClick={() => increaseCartQuantity(foodId)}
        className="text-[24px] cursor-pointer "
      >
        +
      </button>
      <p className="text-[16px] ">{quantity}</p>
      <button
        onClick={() => decreaseCartQuantity(foodId)}
        className="text-[24px] cursor-pointer pb-[3px]"
      >
        -
      </button>
    </div>
  )
}

export default CartQuantityControls
