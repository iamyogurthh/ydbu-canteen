import Link from 'next/link'
import React from 'react'

const CanteenCard = ({ canteen }) => (
  <Link
    href={`/${canteen.id}`}
    className="bg-white rounded-2xl shadow-md px-[8px] pt-[8px] pb-[24px] w-full"
  >
    <img
      src={canteen.img}
      alt={canteen.name}
      className="w-full h-[200px] object-cover rounded-lg mb-[16px] shadow-sm"
    />
    <p className="text-base font-medium">{canteen.name}</p>
  </Link>
)

export default CanteenCard
