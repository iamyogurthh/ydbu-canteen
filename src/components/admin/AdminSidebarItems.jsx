'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SIDEBAR_ITEMS = [
  {
    key: 'admin_statistics',
    path: '',
    label: 'Statistics',
    img: '/system_icons/chart.png',
    activeImg: '/system_icons/chart-active.png',
  },
  {
    key: 'admin_canteen',
    path: '/canteens',
    label: 'Canteens',
    img: '/system_icons/shop.png',
    activeImg: '/system_icons/shop-active.png',
  },
  {
    key: 'admin_users',
    path: '/users',
    label: 'Users',
    img: '/system_icons/users.png',
    activeImg: '/system_icons/users-active.png',
  },
]

const buildFullPath = (base, path) =>
  path === '/admin' ? base : `${base}${path}`

const isActive = (currentPath, base, itemPath) => {
  const fullPath = buildFullPath(base, itemPath)
  return currentPath === fullPath
}

const AdminSidebarItems = () => {
  const currentPath = usePathname()
  const basePath = '/admin'

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

export default AdminSidebarItems
