import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

async function page() {
    const session = await getServerSession(options);
    if(!session){
        redirect('/');
    }
  return (
    <>
    <div className='pt-96'>{session.user.name}</div>
    <div>{session.user.ph_no}</div>
    </>
  )
}

export default page