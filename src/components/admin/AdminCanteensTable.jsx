import React from 'react'

const AdminCanteensTable = () => {
  return (
    <>
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
            {/* {ordersData.map((order) => (
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
                <td className="px-4 py-2">{order.location}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-2 flex space-x-2 action-cell">
                  <button
                    onClick={() =>
                      handleStatusChange(order.order_id, order.status)
                    }
                    disabled={loadingId === order.order_id}
                    className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loadingId === order.order_id ? (
                      <Image
                        src="/system_icons/spinner.svg"
                        width={24}
                        height={24}
                        alt="loading"
                      />
                    ) : (
                      <Image
                        src="/system_icons/rotate.svg"
                        width={24}
                        height={24}
                        alt="change status"
                      />
                    )}
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

      {/* {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          StatusBadge={StatusBadge}
          canteen_id={canteen_id}
        />
      )} */}
    </>
  )
}

export default AdminCanteensTable
