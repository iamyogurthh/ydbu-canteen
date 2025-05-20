import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import Navbar from '../components/Navbar'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <ShoppingCartProvider>
          <Navbar />
          {children}
        </ShoppingCartProvider>
      </body>
    </html>
  )
}
