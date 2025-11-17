'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import FullScreenLoader from '@/components/FullScreenLoader'

function page() {

  const [loading, setLoading] = useState(false)
  const { data: session ,status } = useSession()
  const [user, setUser] = useState(null)
  useEffect(() => {

    async function getUser() {
      try {
        setLoading(true)
        const res = await fetch(
          `http://localhost:3000/api/users/${session.user.ph_no}`
        )
        const data = await res.json()
        setUser(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getUser()
  }, [status])
  
  if (loading || !user) return <FullScreenLoader />

  if(status === 'loading'){
    return <FullScreenLoader />
  }else if(session.user.role_id == 2){
    redirect('/canteenOwner');
  }else if(session.user.role_id == 3){
    redirect('/admin');
  }


  

  const tableRowElements = [
    { label: 'Name', value: session.user.name },
    { label: 'Phone', value: session.user.ph_no },
    { label: 'NRC', value: user.nrc },
    { label: 'Address', value: user.current_address },
  ]

  return (
    <div className="pl-4 md:pl-[40px] pt-[40px] w-full">
      <h1 className="font-bold text-[20px] md:text-[24px] mb-[24px]">
        My Profile
      </h1>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[300px]">
          <tbody>
            {tableRowElements.map((item, index) => (
              <tr key={index} className="block md:table-row mb-4 md:mb-0">
                <td className="py-2 pr-[32px] font-bold block md:table-cell">
                  {item.label}
                </td>
                <td className="py-2 block md:table-cell">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => signOut({ redirect: '/' })}
        className="
          bg-accent 
          text-white 
          py-[10px] 
          px-[48px] md:px-[68px] 
          rounded-[24px] 
          shadow-lg 
          mt-[40px] 
          cursor-pointer
        "
      >
        Logout
      </button>
    </div>
  )
}

export default page
