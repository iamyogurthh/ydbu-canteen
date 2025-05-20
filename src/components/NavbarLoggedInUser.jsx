'use client'
import React from 'react'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import MyCartSideBar from './MyCartSideBar'
import Link from 'next/link'
const NavbarLoggedInUser = () => {
  const { cartQuantity, openCart, closeCart, isOpen } = useShoppingCart()
  const quantity = cartQuantity
  return (
    <div className="flex items-center gap-[32px] relative">
      <div className="relative">
        <img
          src="/system_icons/cart.png"
          className="w-[32px] cursor-pointer"
          onClick={openCart}
        />
        {quantity > 0 && (
          <p className="absolute top-[-12px] right-[-16px] bg-accent px-[8px] py-[1px] rounded-[100px] text-[14px] text-white">
            {quantity}
          </p>
        )}
      </div>

      <>
        <MyCartSideBar />
        {isOpen && <span className="overlay" onClick={closeCart}></span>}
      </>

      <Link href={'/profile'}>
        <img
          src="/system_icons/user-circle.png"
          className="w-[32px] cursor-pointer"
        />
      </Link>
    </div>
  )
}

export default NavbarLoggedInUser
