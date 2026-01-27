'use client'
import React, { useEffect, useState, useMemo } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'

const StatusBadge = ({ status }) => {
  const style = {
    delivered: 'bg-green-600 text-white',
    pending: 'bg-yellow-600 text-black',
  }
  return (
    <span
      className={`px-3 py-1 rounded text-[10px] md:text-xs font-semibold shadow-sm ${
        style[status] || 'bg-gray-400 text-white'
      }`}
    >
      {status}
    </span>
  )
}

const ClientOrderDetailModal = ({ order, onClose }) => {
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!order) return

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

  // Logic to group items by Canteen and calculate sub-totals
  const canteenGroups = useMemo(() => {
    const groups = orderItems.reduce((acc, item) => {
      const name = item.canteen_name
      if (!acc[name]) {
        acc[name] = {
          canteen_name: name,
          items: [],
          canteen_total_price: 0,
        }
      }
      acc[name].items.push(item)
      acc[name].canteen_total_price += Number(item.menu_total_price)
      return acc
    }, {})

    return Object.values(groups)
  }, [orderItems])

  // Overall Total Price
  const grandTotalPrice = orderItems.reduce(
    (sum, item) => sum + Number(item.menu_total_price),
    0
  )

  if (!order) return null
  if (loading) return <FullScreenLoader />

  return (
    <div className="fixed inset-0 bg-[#00000046] flex justify-center items-center z-50 p-2">
      <div
        className="
          bg-white rounded-[16px]
          w-full max-w-[650px]
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
        <div className="flex-1 overflow-y-auto px-[16px] md:px-[24px] pb-[40px]">
          {/* User Info Table */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <table className="text-sm md:text-base w-full">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 font-bold text-gray-600">Name</td>
                  <td className="py-1">{order.name}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-bold text-gray-600">Phone</td>
                  <td className="py-1">{order.phone}</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-bold text-gray-600">Location</td>
                  <td className="py-1 text-red-600 font-medium">
                    {order.current_location}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Grand Total Highlight */}
          <div className="text-center mb-8 border-y border-dashed border-gray-300 py-4">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Total Bill Amount</p>
            <h3 className="font-bold text-2xl md:text-3xl text-red-600">
              {grandTotalPrice.toLocaleString()} <span className="text-lg">MMK</span>
            </h3>
          </div>

          {/* Grouped Items List */}
          <div className="space-y-8">
            {canteenGroups.map((group) => (
              <div key={group.canteen_name} className="border rounded-xl overflow-hidden shadow-sm">
                {/* Canteen Header */}
                <div className="bg-red-50 px-4 py-3 flex justify-between items-center border-b border-red-100">
                  <span className="font-bold text-red-700 md:text-lg">
                    {group.canteen_name}
                  </span>
                  <span className="text-xs md:text-sm font-semibold bg-white px-2 py-1 rounded-lg border border-red-200">
                    Subtotal: {group.canteen_total_price.toLocaleString()} MMK
                  </span>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm md:text-base">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                      <tr>
                        <th className="p-3 text-left">Menu</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Price</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr
                          key={item.order_item_id}
                          className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-3 flex items-center space-x-3">
                            <img
                              src={item.menu_img}
                              alt={item.menu_name}
                              className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-lg object-cover shadow-sm"
                              onError={(e) => (e.target.src = '/fallback.png')}
                            />
                            <span className="font-medium">{item.menu_name}</span>
                          </td>
                          <td className="p-3 text-center font-semibold text-gray-700">
                            {item.menu_quantity}
                          </td>
                          <td className="p-3 text-right font-mono">
                            {Number(item.menu_total_price).toLocaleString()}
                          </td>
                          <td className="p-3 text-center">
                            <StatusBadge status={item.order_item_status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientOrderDetailModal