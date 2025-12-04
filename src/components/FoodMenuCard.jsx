import React from 'react'
import FoodMenuCardBtn from './FoodMenuCardBtn'

const FoodMenuCard = ({ food, canteen_name, showCanteenName = false }) => {
  return (
    <div
      className="
        bg-white 
        rounded-2xl 
        shadow-md 
        hover:shadow-xl 
        transition-shadow 
        duration-300 
        overflow-hidden 
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-t-2xl">
        <img
          src={food.img}
          alt={food.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {showCanteenName && (
          <p className="inline-block mb-2 px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm sm:text-base">
            {canteen_name}
          </p>
        )}

        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {food.name}
        </h3>

        <p className="text-gray-700 font-medium mt-1 mb-4">
          {food.price.toLocaleString()} MMK
        </p>

        <FoodMenuCardBtn
          foodId={food.id}
          food={food}
          canteen_name={canteen_name}
        />
      </div>
    </div>
  )
}

export default FoodMenuCard
