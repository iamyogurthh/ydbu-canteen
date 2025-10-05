'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SIDEBAR_ITEMS = [
  {
    key: 'profile',
    path: '/profile',
    label: 'My Profile',
    img: '/system_icons/user.png',
    activeImg: '/system_icons/user-active.png',
  },
  {
    key: 'shopdashboard',
    path: '/shopdashboard',
    label: 'Shop Dashboard',
    img: '/system_icons/chart.png',
    activeImg: '/system_icons/chart-active.png',
  },
  {
    key: 'myshop',
    path: '/myshop',
    label: 'My Shop',
    img: '/system_icons/shop.png',
    activeImg: '/system_icons/shop-active.png',
  },
]

const buildFullPath = (base, path) =>
  path === '/profile' ? base : `${base}${path}`

// Check if currentPath is active for the item
const isActive = (currentPath, itemPath) => {
  if (itemPath === '/profile') return currentPath === '/profile'
  return currentPath.startsWith(`/profile${itemPath}`)
}

const ProfileSidebarItem = ({ role_id }) => {
  const currentPath = usePathname()
  const basePath = '/profile'

  // Filter items by role
  const filteredItems =
    role_id === 2 || role_id === 3
      ? SIDEBAR_ITEMS
      : SIDEBAR_ITEMS.filter((item) => item.key === 'profile')

  return (
    <>
      {filteredItems.map(({ key, path, label, img, activeImg }) => {
        const fullPath = buildFullPath(basePath, path)
        const active = isActive(currentPath, path)

        return (
          <Link
            href={fullPath}
            key={key}
            className={`sidebar-item-container ${active ? 'active' : ''}`}
          >
            <img
              src={active ? activeImg : img}
              alt={`${label} icon`}
              className="h-[27px] w-[26px] mr-[16px]"
            />
            <p>{label}</p>
          </Link>
        )
      })}
    </>
  )
}

export default ProfileSidebarItem
