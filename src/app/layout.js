import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import Navbar from '../components/Navbar'
import './globals.css'
import AuthProvider from '@/context/AuthProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <ShoppingCartProvider>
            <Navbar />
            {children}
          </ShoppingCartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
