'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import SearchBox from './SearchBox'
import NavbarLoggedInUser from './NavbarLoggedInUser'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white px-4 md:px-10 py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-accent text-xl md:text-2xl font-bold">
          YDBU <span className="text-black">Online Canteen</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block w-[300px] lg:w-[380px] relative">
          <SearchBox />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <Link
              href="/login"
              className="py-2 px-6 bg-accent text-white rounded-3xl shadow-lg cursor-pointer text-sm md:text-base"
            >
              Login
            </Link>
          ) : (
            // session.user.role_id == 1 && <NavbarLoggedInUser />
            <NavbarLoggedInUser />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 pb-4">
          {/* Mobile Search */}
          <div className="w-full">
            <SearchBox />
          </div>

          {/* Mobile Login / User */}
          {!session ? (
            <Link
              href="/login"
              className="
          block
          w-full
          py-2
          bg-accent
          text-white
          rounded-3xl
          shadow-md
          text-center
          font-semibold
        "
            >
              Login
            </Link>
          ) : (
            session.user.role_id == 1 && (
              <div className="w-full">
                <NavbarLoggedInUser />
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
