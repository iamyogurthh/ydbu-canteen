'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [path, setPath] = useState('/')

  useEffect(() => {
    if (status === 'loading') return // wait for session

    if (!session) {
      router.push('/login')
      return
    }

    // set path based on role
    switch (session.user.role_id) {
      case 1:
        setPath('/')
        break
      case 2:
        setPath('/canteenOwner')
        break
      case 3:
        setPath('/admin')
        break
      default:
        setPath('/')
    }
  }, [session, status, router])

  if (status === 'loading') return <p>Loading...</p>

  return (
    <div className="mt-[100px] flex items-center justify-center flex-col">
      <p>You are not authorized</p>
      <Link href={path} className="text-accent underline">
        Go Back
      </Link>
    </div>
  )
}

export default Page
