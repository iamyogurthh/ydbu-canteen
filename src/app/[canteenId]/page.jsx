import FoodMenuCard from '@/components/FoodMenuCard'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }) => {
  const { canteenId } = await params
  const data = await fetch(`http://localhost:3000/api/canteens/${canteenId}`)
  const allData = await data.json()
  return (
    <div className="pt-[60px] pb-[40px]">
      <div className="relative">
        <img
          src={allData.canteen.cover_img}
          className="w-full h-[232px] object-cover opacity-70"
        />
        <img
          src={allData.canteen.profile_img}
          alt={`${allData.canteen.name}`}
          className="w-[304px] h-[171px] object-cover absolute bottom-[-40px] shadow-md rounded-[8px] left-[40px]"
        />
        <Link href={'/'}>
          <img
            src="/system_icons/close.png"
            className="absolute w-[32px] top-[24px] right-[40px]"
          />
        </Link>
      </div>
      <div className="px-[40px]">
        <h1 className="font-bold text-[24px] mt-[56px]">
          {allData.canteen.name}
        </h1>
        <div className="mt-[32px]">
          <h1 className="text-[24px] font-medium mb-[16px]">Available Menus</h1>
          <div className="responsive-grid">
            {allData.menus.reverse().map((food, index) => (
              <FoodMenuCard
                key={index}
                food={food}
                canteen_name={allData.canteen.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
