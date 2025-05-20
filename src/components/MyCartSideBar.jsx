'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import Link from 'next/link'
import React from 'react'

const MyCartSideBar = () => {
  const { closeCart, isOpen } = useShoppingCart() // make sure you get isOpen state too

  return (
    <div
      className={`
        fixed top-0 bottom-0 right-0 w-[542px] p-[40px] bg-white z-[150] flex flex-col justify-between
        transform transition-transform duration-400 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[24px]">My Cart</h1>
        <img
          src="/system_icons/close-accent.png"
          alt="close"
          onClick={closeCart}
          className="w-[24px] cursor-pointer"
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/system_icons/cart-gray.png"
          alt="cart"
          className="w-[44px] mb-[16px]"
        />
        <p className="text-[16px] font-bold text-[#686868]">
          No Item In The Cart Yet
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Link
          href={'/cart'}
          className="bg-accent text-white py-[13px] px-[54px] rounded-[24px] shadow-lg"
        >
          Go To Cart
        </Link>
      </div>
    </div>
  )
}

export default MyCartSideBar
