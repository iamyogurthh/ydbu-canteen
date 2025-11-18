// A client component to conditionally render Navbar
'use client'
import { useSession } from 'next-auth/react'
import Navbar from './Navbar'
import FullScreenLoader from './FullScreenLoader'
export function NavbarWrapper() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <FullScreenLoader />
  }

  // Hide navbar for role_id 2 or 3
  if (session?.user?.role_id === 2 || session?.user?.role_id === 3) {
    return null
  }

  return <Navbar />
}
