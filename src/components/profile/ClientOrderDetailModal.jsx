'use client'
import React, { useEffect, useState } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'

const StatusBadge = ({ status }) => {
  const style = {
    delivered: 'bg-green-600 text-white',
    pending: 'bg-yellow-600 text-black',
  }
  return (
    <span
      className={`px-3 py-1 rounded text-xs md:text-sm font-semibold shadow-lg ${style[status]}`}
    >
      {status}
    </span>
  )
}

const ClientOrderDetailModal = ({ order, onClose }) => {
  if (!order) return null

  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + Number(item.menu_total_price),
    0
  )

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `/api/orders/history/${order.user_id}/${order.order_id}`
        )
        const data = await res.json()
        setOrderItems(data)
      } catch (err) {
        console.error('Error fetching items:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrderItems()
  }, [order])

  if (loading) return <FullScreenLoader />

  return (
    <div className="fixed inset-0 bg-[#00000046] flex justify-center items-center z-50 p-2">
      <div
        className="
          bg-white rounded-[16px]
          w-full max-w-[600px]
          h-[90vh]
          relative flex flex-col
          overflow-hidden
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[16px] md:px-[24px] mt-[20px] mb-[12px]">
          <h2 className="text-red-600 font-bold text-lg md:text-xl">
            Order Detail
          </h2>

          <button className="cursor-pointer" onClick={onClose}>
            <img
              src="/system_icons/close-accent.png"
              alt="close"
              className="w-[18px] md:w-[20px]"
            />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-[16px] md:px-[24px] pb-[20px]">
          {/* User Info */}
          <table className="mb-[20px] text-sm md:text-base w-full">
            <tbody>
              <tr>
                <td className="py-2 pr-[20px] md:pr-[40px] font-bold">Name</td>
                <td className="py-2">{order.name}</td>
              </tr>
              <tr>
                <td className="py-2 pr-[20px] md:pr-[40px] font-bold">Phone</td>
                <td className="py-2">{order.phone}</td>
              </tr>
              <tr>
                <td className="py-2 pr-[20px] md:pr-[40px] font-bold">
                  Location
                </td>
                <td className="py-2">{order.current_location}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Price */}
          <div className="flex items-center justify-center mb-[20px]">
            <h3 className="font-bold text-[20px] md:text-[24px] text-red-600">
              Total Price:{' '}
              <span className="text-black font-semibold">{totalPrice} MMK</span>
            </h3>
          </div>

          {/* Items Header */}
          <div className="flex items-center justify-center mb-[8px]">
            <h4 className="font-semibold text-sm md:text-base">
              Ordered Items List
            </h4>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm md:text-base">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2 text-left">Item Name</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr
                    key={item.order_item_id}
                    className="odd:bg-red-100 border-b-[2px] border-[#D9D9D9]"
                  >
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={item.menu_img}
                        alt={item.menu_name}
                        className="w-[60px] h-[44px] md:w-[75px] md:h-[56px] rounded-[8px] object-cover"
                        onError={(e) => (e.target.src = '/fallback.png')}
                      />
                      <span>{item.menu_name}</span>
                    </td>
                    <td className="p-2">{item.menu_quantity}</td>
                    <td className="p-2">{item.menu_total_price}</td>
                    <td className="p-2">
                      <StatusBadge status={item.order_item_status} />
                    </td>
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

export default ClientOrderDetailModal
