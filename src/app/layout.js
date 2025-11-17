import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import Navbar from '../components/Navbar'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { OPTIONS } from './api/auth/[...nextauth]/route'


export default async function RootLayout({ children,params }) {
  const session = await getServerSession(OPTIONS)

  const hideNav = session?.user?.role_id === 2 || session?.user?.role_id === 3

  // const pathname = usePathname()
  // const hideNav =
  //   pathname.startsWith('/canteenOwner') || pathname.startsWith('/admin')
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <ShoppingCartProvider>
            {!hideNav && <Navbar />}
            {children}
          </ShoppingCartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
