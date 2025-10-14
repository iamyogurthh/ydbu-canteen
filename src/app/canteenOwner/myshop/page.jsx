import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'
import Link from 'next/link'
import MyShopTable from '@/components/myshop/MyShopTable'

const page = async () => {
  const session = await getServerSession(OPTIONS)
  const data = await fetch(
    `http://localhost:3000/api/canteens/${session.user.canteen_id}`
  )
  const allData = await data.json()
  return (
    <div className="pb-[40px]">
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
        <Link
          href={'/canteenOwner/myshop/editprofile'}
          className="bg-accent absolute top-[24px]  right-[40px] flex items-center px-[16px] py-[4px] rounded-[24px] shadow-md"
        >
          <p className="mr-[8px] font-bold text-white">Edit</p>
          <img src="/system_icons/pen-to-square.png" className="w-[18px] " />
        </Link>
      </div>

      <h1 className="font-bold text-[24px] mt-[56px] ml-[40px]">
        {allData.canteen.name}
      </h1>
      <div className="px-[40px] mt-[40px]">
        <div className="flex items-center justify-between">
          <p className="text-accent font-bold">
            Total Number of Menu: {allData.menus.length}{' '}
          </p>
          <Link
            href={'/canteenOwner/myshop/addmenu'}
            className="bg-accent flex items-center px-[24px] py-[8px] rounded-[24px] shadow-md"
          >
            <p className="mr-[8px] font-bold text-white">Add Menu</p>
            <img src="/system_icons/fork-active.png" className="w-[20px]" />
          </Link>
        </div>
        <div>
          <MyShopTable menuItems={allData.menus} />
        </div>
      </div>
    </div>
  )
}

export default page
