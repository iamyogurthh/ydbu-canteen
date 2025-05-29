import React from 'react'
import CartQuantityControls from './CartQuantityControls'
import Link from 'next/link'

const MyCartSideBarItem = ({ item }) => {
  console.log(item)
  return (
    <div className="flex items-center w-full justify-between py-[8px] border-b-1 border-[#C2C2C2]">
      <div className="flex items-center">
        <img
          src={item.food.img}
          alt={item.food.name}
          className="w-[100px] h-[56px] object-fill rounded-[8px] shadow-md mr-[24px]"
        />
        <div>
          <p className="text-left">{item.food.name}</p>
          <Link
            href={`http://localhost:3000/${item.food.canteen_id}`}
            className="text-left text-[14px] font-bold cursor-pointer"
          >
            {item.canteen_name}
          </Link>
        </div>
      </div>
      <CartQuantityControls foodId={item.id} />
    </div>
  )
}

export default MyCartSideBarItem
