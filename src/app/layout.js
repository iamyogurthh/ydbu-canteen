'use client'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import Navbar from '../components/Navbar'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const hideNav =
    pathname.startsWith('/canteenOwner') || pathname.startsWith('/admin')
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
