import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import Navbar from '../components/Navbar'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'
import { Suspense } from 'react'
import { NavbarWrapper } from '@/components/NavbarWrapper'
import FullScreenLoader from '@/components/FullScreenLoader'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <ShoppingCartProvider>
            {/* Suspense handles loading of client components */}
            <Suspense fallback={<FullScreenLoader />}>
              <NavbarWrapper />
            </Suspense>
            {children}
          </ShoppingCartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
