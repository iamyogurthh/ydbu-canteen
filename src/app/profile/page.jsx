'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

function page() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [user , setUser] = useState(null);
  useEffect(() => {
    if(!session){
      return;
    }
    async function getUser() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/users/${session.user.ph_no}`
        )
        const data = await res.json()
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
    getUser()
  }, [])
  if (!session) {
    redirect('/')
    return null;
  }

  if (loading || !user) {
    return <h1>Loading...</h1>
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
      <button onClick={() => signOut({ redirect: '/' })} className="bg-accent text-white py-[10px] px-[68px] rounded-[24px] shadow-lg mt-[40px] cursor-pointer">
        Logout
      </button>
    </>
  )
}

export default page
