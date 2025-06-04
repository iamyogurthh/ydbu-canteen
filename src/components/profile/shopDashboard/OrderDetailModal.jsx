'use client'

import React from 'react'

const OrderDetailModal = ({ order, onClose, StatusBadge }) => {
  if (!order) return null

  const tableRowElements = [
    {
      label: 'Name',
      value: 'Sai Eain Khant',
    },
    {
      label: 'Phone',
      value: '0913221321',
    },
    {
      label: 'Major',
      value: 'Computer Science',
    },
    {
      label: 'Location',
      value: 'CTC4',
    },
  ]

  return (
    <div className="fixed inset-0 bg-[#00000046] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[16px] w-[600px] relative pb-[24px]">
        <div className="flex items-center justify-between px-[24px] mt-[24px] mb-[40px]">
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

        <div className="px-[24px] mb-[24px]">
          <table>
            <tbody>
              {tableRowElements.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 pr-[40px] font-bold">{item.label}</td>
                  <td className="py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center">
          <h3 className="font-bold text-[24px] text-red-600">
            Total Price:{' '}
            <span className="text-black font-semibold">{order.total}</span>
          </h3>
        </div>

        <div className=" mt-[24px] flex items-center justify-center">
          <h4 className="font-semibold">Ordered Items List</h4>
        </div>

        <table className="w-full mt-[16px]">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2 text-left">Item Name</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="bg-red-100">
                <td className="p-2 flex items-center space-x-2">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[75px] h-[56px] rounded-[8px] object-cover"
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
  )
}

export default OrderDetailModal
