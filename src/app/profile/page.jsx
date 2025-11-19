'use client'

import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import FullScreenLoader from '@/components/FullScreenLoader'
import { formatDateTime } from '@/utils/formatDateTime'
import ClientOrderDetailModal from '@/components/profile/ClientOrderDetailModal'

function Page() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [orderHistoryList, setOrderHistoryList] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    // Wait until session is loaded
    if (!session || status !== 'authenticated') return

    async function getData() {
      try {
        setLoading(true)

        const [userRes, orderRes] = await Promise.all([
          fetch(`/api/users/${session.user.ph_no}`),
          fetch(`/api/orders/history/${session.user.id}`),
        ])

        const users = await userRes.json()
        setUser(users)

        const orders = await orderRes.json()
        setOrderHistoryList(orders)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [status, session])

  console.log(orderHistoryList)

  // Waiting for session
  if (status === 'loading') return <FullScreenLoader />

  // If user logged out or session not ready
  if (!session) return <FullScreenLoader />

  // Redirect according to user role
  if (session.user.role_id == 2) redirect('/canteenOwner')
  if (session.user.role_id == 3) redirect('/admin')

  // Wait for user data
  if (loading || !user) return <FullScreenLoader />

  const tableRowElements = [
    { label: 'Name', value: session.user.name },
    { label: 'Phone', value: session.user.ph_no },
    { label: 'NRC', value: user.nrc },
    { label: 'Address', value: user.current_address },
  ]

  return (
    <div className="pl-4 md:pl-[40px] pt-[40px] w-full">
      <h1 className="font-bold text-[20px] md:text-[24px] mb-[24px]">
        My Profile
      </h1>

      {/* USER INFO TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[300px]">
          <tbody>
            {tableRowElements.map((item, index) => (
              <tr key={index} className="block md:table-row mb-4 md:mb-0">
                <td className="py-2 pr-[32px] font-bold block md:table-cell">
                  {item.label}
                </td>
                <td className="py-2 block md:table-cell">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => signOut({ redirect: '/' })}
        className="bg-accent text-white py-[10px] px-[48px] md:px-[68px] rounded-[24px] shadow-lg mt-[40px] cursor-pointer"
      >
        Logout
      </button>

      {/* ORDER HISTORY */}
      <div>
        <h1 className="mt-8 text-lg text-accent font-semibold">
          Order History
        </h1>

        <div className="overflow-x-auto border border-gray-300 rounded-[16px] mt-4">
          <table className="w-full bg-white">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Order Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Ordered Date</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryList.map((order) => (
                <tr
                  key={order.order_id}
                  className="hover:bg-gray-100 cursor-pointer odd:bg-[#d7222217]"
                  onClick={(e) => {
                    if (e.target.closest('.action-cell')) return
                    setSelectedOrder(order)
                  }}
                >
                  <td className="px-4 py-2">{order.order_id}</td>
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">{order.current_location}</td>
                  <td className="px-4 py-2">
                    {formatDateTime(order.order_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*For Client  MODAL */}
        {selectedOrder && (
          <ClientOrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Page
