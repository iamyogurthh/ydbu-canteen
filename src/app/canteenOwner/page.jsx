'use client'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import FullScreenLoader from '@/components/FullScreenLoader'

function page() {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!session) {
      return
    }
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
  }, [])
  if (!session) {
    redirect('/')
    return null
  }

  if (loading || !user) {
    return <FullScreenLoader />
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
      label: 'Address',
      value: user.current_address,
    },
  ]

  return (
    <div className="pl-[40px] pt-[40px]">
      <h1 className="font-bold text-[24px] mb-[24px] ">My Profile</h1>
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
    </div>
  )
}

export default page
