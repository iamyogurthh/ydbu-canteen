'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import calculateTotalPrice from '@/utils/calculateTotalPrice'
import Link from 'next/link'
import React from 'react'

const MyRecipes = () => {
  const { cartItems } = useShoppingCart()
  const totalPrice = calculateTotalPrice(cartItems)
  const isCartEmpty = cartItems.length === 0
  return (
    <div className="bg-white rounded-[8px] shadow-md py-[16px] px-[40px] w-[40%]">
      <div className="flex items-center justify-center mb-[24px] pb-[16px] border-b-[2px] border-[#DDDDDD]">
        <h1 className="text-[24px] text-accent">My Recipes</h1>
      </div>
      <div className="border-b-[2px] border-[#DDDDDD] pb-[160px]">
        <p className="font-bold">
          Sub Total:{' '}
          <span className="font-medium ml-[40px]">{totalPrice} MMK</span>
        </p>
      </div>
      <div className="my-[40px]">
        <p className="font-bold">
          Total: <span className="font-medium ml-[40px]">{totalPrice} MMK</span>
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Link
          href={isCartEmpty ? '#' : '/checkout'}
          className={`primary-btn ${
            isCartEmpty ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default MyRecipes
