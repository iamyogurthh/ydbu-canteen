'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProfileSidebarItem = ({ role_id }) => {
  const currentPath = usePathname()

  const sidebarItemElements = [
    {
      path: '/profile',
      label: 'My Profile',
      img: '/system_icons/user.png',
      active_img: '/system_icons/user-active.png',
    },
    {
      path: '/shopdashboard',
      label: 'Shop Dashboard',
      img: '/system_icons/chart.png',
      active_img: '/system_icons/chart-active.png',
    },
    {
      path: '/myshop',
      label: 'My Shop',
      img: '/system_icons/shop.png',
      active_img: '/system_icons/shop-active.png',
    },
  ]

  const filteredItems =
    role_id === 2 || role_id === 3
      ? sidebarItemElements
      : sidebarItemElements.filter((item) => item.path === '/profile')
  return (
    <>
      {filteredItems.map((item, index) => {
        const fullPath = `/profile${item.path === '/profile' ? '' : item.path}`
        const isActive = currentPath === fullPath

        return (
          <Link
            href={fullPath}
            key={index}
            className={`sidebar-item-container ${isActive ? 'active' : ''}`}
          >
            <img
              src={isActive ? item.active_img : item.img}
              alt={`${item.label}-icon`}
              className="h-[27px] w-[26px] mr-[16px]"
            />
            <p>{item.label}</p>
          </Link>
        )
      })}
    </>
  )
}

export default ProfileSidebarItem
