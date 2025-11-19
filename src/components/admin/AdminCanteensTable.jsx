'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatDateTime } from '@/utils/formatDateTime'

const AdminCanteensTable = ({ canteens: initialCanteens }) => {
  const [canteens, setCanteens] = useState(initialCanteens)
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    setCanteens(initialCanteens)
  }, [initialCanteens])

  const handleDelete = async (canteenId) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this canteen?'
    )
    if (!confirmDelete) return

    try {
      setLoadingId(canteenId)

      const res = await fetch(`/api/canteens/self/${canteenId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setCanteens(canteens.filter((c) => c.canteen_id !== canteenId))
        alert('Canteen deleted successfully!')
      } else {
        const data = await res.json()
        alert(`Failed to delete canteen: ${data.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong!')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-[16px]">
      <table className="w-full bg-white">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Canteen Id</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Owner Name</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {canteens.map((canteen) => (
            <tr
              key={canteen.canteen_id}
              className="hover:bg-gray-100 cursor-pointer odd:bg-[#d7222217]"
            >
              <td className="px-4 py-2">{canteen.canteen_id}</td>
              <td className="px-4 py-2">{canteen.canteen_name}</td>
              <td className="px-4 py-2">{canteen.owner_name}</td>
              <td className="px-4 py-2">
                {formatDateTime(canteen.created_at)}
              </td>
              <td className="px-4 py-2 flex space-x-2 action-cell">
                <button
                  className="cursor-pointer disabled:opacity-40"
                  onClick={() => handleDelete(canteen.canteen_id)}
                  disabled={loadingId === canteen.canteen_id}
                >
                  {loadingId === canteen.canteen_id ? (
                    <span>Deleting...</span>
                  ) : (
                    <Image
                      src={'/system_icons/trash.svg'}
                      width={32}
                      height={32}
                      alt="Delete Canteen"
                    />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminCanteensTable
