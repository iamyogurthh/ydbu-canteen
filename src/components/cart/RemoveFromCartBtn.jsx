'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import React from 'react'

const RemoveFromCartBtn = ({ foodId }) => {
  const { removeFromCart } = useShoppingCart()
  return (
    <p
      className="text-red-500 text-center font-bold cursor-pointer "
      onClick={() => removeFromCart(foodId)}
    >
      Remove
    </p>
  )
}

export default RemoveFromCartBtn
