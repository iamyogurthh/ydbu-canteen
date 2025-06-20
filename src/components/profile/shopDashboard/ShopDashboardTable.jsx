'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import OrderDetailModal from '@/components/profile/shopDashboard/OrderDetailModal'

const StatusBadge = ({ status }) => {
  const style = {
    delivered: 'bg-green-500 text-white',
    pending: 'bg-yellow-400 text-black',
  }
  return (
    <span
      className={`px-4 py-1 rounded text-sm font-semibold shadow-lg ${style[status]}`}
    >
      {status}
    </span>
  )
}

const ShopDashboardTable = ({ orders, canteen_id }) => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  return (
    <>
      <div className="overflow-x-auto border border-gray-300 rounded-[16px]">
        <table className="w-full bg-white">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Major</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  if (e.target.closest('.action-cell')) return
                  setSelectedOrder(order)
                }}
              >
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">{order.major}</td>
                <td className="px-4 py-2">{order.location}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-2 flex space-x-2 action-cell">
                  <Link href="#">
                    <img
                      src="/system_icons/edit.png"
                      className="w-[40px]"
                      alt="edit"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          StatusBadge={StatusBadge}
          canteen_id={canteen_id}
        />
      )}
    </>
  )
}

export default ShopDashboardTable
