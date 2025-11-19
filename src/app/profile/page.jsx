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

  if (status === 'loading') return <FullScreenLoader />
  if (!session) return <FullScreenLoader />

  if (session.user.role_id == 2) redirect('/canteenOwner')
  if (session.user.role_id == 3) redirect('/admin')

  if (loading || !user) return <FullScreenLoader />

  const tableRowElements = [
    { label: 'Name', value: session.user.name },
    { label: 'Phone', value: session.user.ph_no },
    { label: 'NRC', value: user.nrc },
    { label: 'Address', value: user.current_address },
  ]

  return (
    <div className="w-full px-4 md:px-[40px] pt-[40px] pb-[60px]">
      <h1 className="font-bold text-[20px] md:text-[24px] mb-[24px]">
        My Profile
      </h1>

      {/* USER INFO TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[320px]">
          <tbody>
            {tableRowElements.map((item, index) => (
              <tr key={index} className="block md:table-row mb-4 md:mb-0">
                <td className="py-2 pr-[32px] font-bold block md:table-cell whitespace-nowrap">
                  {item.label}
                </td>
                <td className="py-2 block md:table-cell">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={() => signOut({ redirect: '/' })}
        className="bg-accent text-white py-[10px] px-[48px] md:px-[68px] rounded-[24px] shadow-lg mt-[40px] cursor-pointer"
      >
        Logout
      </button>

      {/* ORDER HISTORY */}
      <div className="mt-10">
        <h1 className="text-lg text-accent font-semibold">Order History</h1>

        <div className="overflow-x-auto border border-gray-300 rounded-[16px] mt-4">
          <table className="w-full bg-white min-w-[600px]">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Order Id
                </th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Name</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Phone</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Location
                </th>
                <th className="px-4 py-2 text-left whitespace-nowrap">
                  Ordered Date
                </th>
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

        {/* MODAL */}
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
