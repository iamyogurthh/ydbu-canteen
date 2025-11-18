'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const MyShopTable = ({ menuItems }) => {
  const router = useRouter()

  // Track loading by menuId
  const [loadingId, setLoadingId] = useState(null)

  async function handleStatusChange(id, currentStatus) {
    if (loadingId) return // prevent spam click

    setLoadingId(id)

    const newStatus =
      currentStatus === 'available' ? 'notavailable' : 'available'
    const formData = new FormData()
    formData.append('status', newStatus)

    try {
      const res = await fetch(`/api/menus/${id}/status`, {
        method: 'PUT',
        body: formData,
      })

      if (res.ok) {
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
      alert('Network Error')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-[16px] mt-[16px]">
      <table className="w-full bg-white">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Item Image</th>
            <th className="px-4 py-2 text-left">Item Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...menuItems].reverse().map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[120px] h-[80px]"
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.price} MMK</td>

              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-md text-white text-sm ${
                    item.status === 'available' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="px-4 py-2">
                <div className="flex gap-8">
                  <Link
                    href={`/canteenOwner/myshop/editmenu?id=${item.id}`}
                    className="flex items-center h-full"
                  >
                    <img
                      src="/system_icons/pen-to-square-black.png"
                      className="w-[24px] mr-[8px]"
                      alt="edit"
                    />
                  </Link>

                  <button
                    disabled={loadingId === item.id}
                    className={`cursor-pointer disabled:opacity-40 disabled:cursor-none`}
                    onClick={() => handleStatusChange(item.id, item.status)}
                  >
                    {loadingId === item.id ? (
                      <Image
                        src="/system_icons/spinner.svg"
                        width={24}
                        height={24}
                        alt="loading"
                      />
                    ) : (
                      <Image
                        src="/system_icons/rotate.svg"
                        width={24}
                        height={24}
                        alt="change status"
                      />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyShopTable
