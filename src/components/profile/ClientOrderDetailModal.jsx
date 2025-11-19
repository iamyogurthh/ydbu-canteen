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
      className={`px-4 py-1 rounded text-sm font-semibold shadow-lg ${style[status]}`}
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

  console.log(orderItems)

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
    <div className="fixed inset-0 bg-[#00000046] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[16px] w-[600px] h-[90%] relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] mt-[24px] mb-[16px]">
          <h2 className="text-red-600 font-bold text-xl">Order Detail</h2>
          {/* <StatusBadge status={orderItems.order_item_status} /> */}
          <button className="cursor-pointer" onClick={onClose}>
            <img
              src="/system_icons/close-accent.png"
              alt="close"
              className="w-[20px]"
            />
          </button>
        </div>

        {/* Scrollable Section */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px]">
          {/* User Info */}
          <table className="mb-[24px]">
            <tbody>
              <tr>
                <td className="py-2 pr-[40px] font-bold">Name</td>
                <td className="py-2">{order.name}</td>
              </tr>
              <tr>
                <td className="py-2 pr-[40px] font-bold">Phone</td>
                <td className="py-2">{order.phone}</td>
              </tr>
              <tr>
                <td className="py-2 pr-[40px] font-bold">Location</td>
                <td className="py-2">{order.current_location}</td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="flex items-center justify-center mb-[24px]">
            <h3 className="font-bold text-[24px] text-red-600">
              Total Price:{' '}
              <span className="text-black font-semibold">{totalPrice} MMK</span>
            </h3>
          </div>

          {/* Items Header */}
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
                {orderItems.map((item) => (
                  <tr
                    key={item.order_item_id}
                    className="odd:bg-red-100 border-b-[2px] border-[#D9D9D9]"
                  >
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={item.menu_img}
                        alt={item.menu_name}
                        className="w-[75px] h-[56px] rounded-[8px] object-cover"
                        onError={(e) => (e.target.src = '/fallback.png')}
                      />
                      <span>{item.menu_name}</span>
                    </td>
                    <td className="p-2">{item.menu_quantity}</td>
                    <td className="p-2">{item.menu_total_price}</td>
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
