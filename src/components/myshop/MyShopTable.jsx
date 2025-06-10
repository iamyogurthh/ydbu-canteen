import React from 'react'
import Link from 'next/link'
import MenuItemDetailModal from './MenuItemDetailModal'

const MyShopTable = ({ menuItems }) => {
  //   const [selectedMenu, setselectedMenu] = useState(null)
  console.log(menuItems)
  return (
    <>
      <div className="overflow-x-auto border border-gray-300 rounded-[16px] mt-[16px]">
        <table className="w-full bg-white">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Item Image</th>
              <th className="px-4 py-2 text-left">Item Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 cursor-pointer odd:bg-[#d7222217]"
                // onClick={(e) => {
                //   if (e.target.closest('.action-cell')) return
                //   setSelectedOrder(order)
                // }}
              >
                <td className="px-4 py-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[120px] h-[80px] shadow-md rounded-[8px]"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.price} MMK</td>
                <td className="px-4 py-2  space-x-2 action-cell">
                  <div className="flex items-center">
                    <Link href="#">
                      <img
                        src="/system_icons/pen-to-square-black.png"
                        className="w-[24px] mr-[8px]"
                        alt="edit"
                      />
                    </Link>
                    <p className="font-bold">Edit Menu</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {selectedMenu && (
        <MenuItemDetailModal
          order={selectedOrder}
          onClose={() => setselectedMenu(null)}
          canteen_id={canteen_id}
        />
      )} */}
    </>
  )
}

export default MyShopTable
