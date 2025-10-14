'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SIDEBAR_ITEMS = [
  {
    key: 'co_profile',
    path: '',
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
  path === '/canteenOwner' ? base : `${base}${path}`

const isActive = (currentPath, base, itemPath) => {
  const fullPath = buildFullPath(base, itemPath)
  return currentPath === fullPath
}

const COSidebarItems = () => {
  const currentPath = usePathname()
  const basePath = '/canteenOwner'

  return (
    <>
      {SIDEBAR_ITEMS.map(({ key, path, label, img, activeImg }) => {
        const fullPath = buildFullPath(basePath, path)
        const active = isActive(currentPath, basePath, path)

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

export default COSidebarItems
