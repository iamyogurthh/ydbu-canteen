import { getServerSession } from 'next-auth'
import React from 'react'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

async function page() {
  const session = await getServerSession(OPTIONS)
  if (!session) {
    redirect('/')
  }

  let user = null
  try {
    const res = await fetch(
      `http://localhost:3000/api/users/${session.user.ph_no}`
    )
    const data = await res.json()
    user = data
  } catch (error) {
    console.log(error)
  }

  const tableRowElements = [
    {
      label: 'Name',
      value: session.user.name,
    },
    {
      label: 'Phone',
      value: session.user.ph_no,
    },
    {
      label: 'NRC',
      value: user.nrc,
    },
    {
      label: 'Major',
      value: user.major,
    },
    {
      label: 'Roll-Number',
      value: user.roll_no,
    },
    {
      label: 'Address',
      value: user.current_address,
    },
  ]

  return (
    <>
      <h1 className="font-bold text-[24px] mb-[24px]">My Profile</h1>
      <img src={user.img} alt="user-img" className="w-[152px] mb-[40px]" />
      <table>
        <tbody>
          {tableRowElements.map((item, index) => (
            <tr key={index}>
              <td className="py-2 pr-[32px] font-bold">{item.label}</td>
              <td className="py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-accent text-white py-[10px] px-[68px] rounded-[24px] shadow-lg mt-[40px] cursor-pointer">
        Logout
      </button>
    </>
  )
}

export default page
