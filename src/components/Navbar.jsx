'use client'
import Link from 'next/link'
import React from 'react'
import SearchBox from './SearchBox'
import NavbarLoggedInUser from './NavbarLoggedInUser'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  
  const {data : session} = useSession();
  return (
    <div className="bg-white px-[40px] py-[16px] shadow-lg flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <Link href={'/'} className="text-accent text-[24px] font-bold">
        YDBU <span className="text-black">Online Canteen</span>
      </Link>
      <div>
        <SearchBox />
      </div>
      <div>
        {!session ? (
          <Link
            href={'/login'}
            className="py-[8px] px-[32px] bg-accent text-white rounded-[24px] shadow-lg cursor-pointer"
          >
            Login
          </Link>
        ) : (
          <NavbarLoggedInUser />
        )}
      </div>
    </div>
  )
}

export default Navbar
