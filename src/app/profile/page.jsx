import { getServerSession } from 'next-auth'
import React from 'react'
import { OPTIONS } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

async function page() {
  const session = await getServerSession(OPTIONS)
  if (!session) {
    redirect('/')
  }
  return (
    <>
      <div className="pt-96">{session.user.name}</div>
      <div>{session.user.ph_no}</div>
    </>
  )
}

export default page
