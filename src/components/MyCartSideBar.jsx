'use client'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import Link from 'next/link'
import React from 'react'
import MyCartSideBarItem from './MyCartSideBarItem'

const MyCartSideBar = () => {
  const { closeCart, isOpen, cartItems } = useShoppingCart()
  return (
    <div
      className={`
        fixed top-0 bottom-0 right-0 w-[542px] p-[40px] bg-white z-[150] flex flex-col 
        transform transition-transform duration-400 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div>
        <div className="flex items-center justify-between absolute top-0 left-0 right-0 px-[40px] py-[20px] bg-white z-[10000]">
          <h1 className="text-[24px]">My Cart</h1>
          <img
            src="/system_icons/close-accent.png"
            alt="close"
            onClick={closeCart}
            className="w-[24px] cursor-pointer"
          />
        </div>

        {cartItems.length > 0 && (
          <div className="flex flex-col items-start absolute left-0 right-0 bottom-0 top-0 px-[40px] pt-[80px] overflow-y-auto pb-[90px]">
            {cartItems.map((item, index) => (
              <MyCartSideBarItem item={item} key={index} />
            ))}
          </div>
        )}
      </div>

      {cartItems.length <= 0 && (
        <div className="flex flex-col items-center justify-center mt-[60%]">
          <img
            src="/system_icons/cart-gray.png"
            alt="cart"
            className="w-[44px] mb-[16px]"
          />
          <p className="text-[16px] font-bold text-[#686868]">
            No Item In The Cart Yet
          </p>
        </div>
      )}

      <div className="flex items-center justify-center absolute bottom-0 py-[20px] left-0 right-0 bg-white">
        <Link
          href={'/cart'}
          className="bg-accent text-white py-[13px] px-[54px] rounded-[24px] shadow-lg"
          onClick={() => closeCart()}
        >
          Go To Cart
        </Link>
      </div>
    </div>
  )
}

export default MyCartSideBar
