'use client'
import FullScreenLoader from '@/components/FullScreenLoader'
import React, { useEffect, useState } from 'react'

const OrderDetailModal = ({ order, onClose, StatusBadge, canteen_id }) => {
  if (!order) return null

  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)

  const tableRowElements = [
    { label: 'Name', value: order.name },
    { label: 'Phone', value: order.phone },
    { label: 'Major', value: order.major },
    { label: 'Location', value: order.location },
  ]

  const totalPrice = orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  useEffect(() => {
    if (!order || !canteen_id) return

    const getOrderItems = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `/api/admin/canteens/${canteen_id}/orders/users/${order.customer_id}`
        )
        const data = await res.json()
        setOrderItems(data)
      } catch (err) {
        console.error('Error fetching order items:', err)
      } finally {
        setLoading(false)
      }
    }

    getOrderItems()
  }, [order, canteen_id])

  if (loading) {
    return <FullScreenLoader />
  }

  return (
    <div className="fixed inset-0 bg-[#00000046] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[16px] w-[600px] h-[90%] relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] mt-[24px] mb-[16px]">
          <h2 className="text-red-600 font-bold text-xl">Order Detail</h2>
          <StatusBadge status={order.status} />
          <button className="cursor-pointer" onClick={onClose}>
            <img
              src="/system_icons/close-accent.png"
              alt="close"
              className="w-[20px]"
            />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px]">
          {/* User Info Table */}
          <table className="mb-[24px]">
            <tbody>
              {tableRowElements.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 pr-[40px] font-bold">{item.label}</td>
                  <td className="py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Price */}
          <div className="flex items-center justify-center mb-[24px]">
            <h3 className="font-bold text-[24px] text-red-600">
              Total Price:{' '}
              <span className="text-black font-semibold">{totalPrice} MMK</span>
            </h3>
          </div>

          {/* Ordered Items Header */}
          <div className="flex items-center justify-center mb-[8px]">
            <h4 className="font-semibold">Ordered Items List</h4>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2 text-left">Item Name</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-red-100 border-b-[2px] border-[#D9D9D9]"
                  >
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={item.img || '/fallback.png'}
                        alt={item.name || 'Item'}
                        className="w-[75px] h-[56px] rounded-[8px] object-cover"
                        onError={(e) => (e.target.src = '/fallback.png')}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailModal
