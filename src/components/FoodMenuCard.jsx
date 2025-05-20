import React from 'react'
import FoodMenuCardBtn from './FoodMenuCardBtn'

const FoodMenuCard = ({ food }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md px-[8px] pt-[8px] pb-[24px] w-full">
      <img
        src={food.img}
        alt={food.name}
        className="w-full h-[160px] object-cover rounded-lg mb-[16px] shadow-sm"
      />
      <p className="text-base font-semibold">{food.name}</p>
      <p className="text-base font-medium mb-[16px]">{food.price} MMK</p>
      <FoodMenuCardBtn foodId={food} />
    </div>
  )
}

export default FoodMenuCard
