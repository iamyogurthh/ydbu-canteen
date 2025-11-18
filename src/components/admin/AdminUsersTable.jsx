'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const AdminUsersTable = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers)
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const determineRole = (id) => {
    if (id === 1) return 'Customer'
    if (id === 2) return 'Canteen Owner'
    if (id === 3) return 'Administrator'
  }

  const handleDelete = async (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?')
    if (!confirmDelete) return

    try {
      setLoadingId(userId) // disable button for this user
      const res = await fetch(`/api/users/self/${userId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // Remove the deleted user from state
        setUsers(users.filter((u) => u.id !== userId))
        alert('User deleted successfully!')
      } else {
        const data = await res.json()
        alert(`Failed to delete user: ${data.message || 'Unknown error'}`)
      }
    } catch (err) {
      console.error(err)
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
            <th className="px-4 py-2 text-left">Account Id</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Current Address</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 cursor-pointer odd:bg-[#d7222217]"
            >
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.ph_no}</td>
              <td className="px-4 py-2">{determineRole(user.role_id)}</td>
              <td className="px-4 py-2">{user.current_address}</td>
              <td className="px-4 py-2">
                <button
                  className="cursor-pointer disabled:opacity-40"
                  onClick={() => handleDelete(user.id)}
                  disabled={loadingId === user.id}
                >
                  {loadingId === user.id ? (
                    <span>Deleting...</span>
                  ) : (
                    <Image
                      src={'/system_icons/trash.svg'}
                      width={32}
                      height={32}
                      alt="Delete User"
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

export default AdminUsersTable
