import React from 'react'
import CartQuantityControls from '../CartQuantityControls'
import RemoveFromCartBtn from './RemoveFromCartBtn'

const MyCartItemListTableItem = ({ item }) => {
  return (
    <tr className="border-b-[1px] border-gray-200">
      <td className="py-[16px] px-[24px] flex items-center gap-[16px] ">
        <img
          src={item.food.img}
          alt={item.food.name}
          className="w-[100px] h-[56px] object-fill rounded-[8px] shadow-md"
        />
        <div>
          <p className="font-semibold">{item.food.name}</p>
          <p className="text-[14px]">{item.canteen_name}</p>
        </div>
      </td>
      <td className="">
        <CartQuantityControls foodId={item.id} />
      </td>
      <td className="text-right">{item.food.price * item.quantity} MMK</td>
      <td>
        <RemoveFromCartBtn foodId={item.id} />
      </td>
    </tr>
  )
}

export default MyCartItemListTableItem
