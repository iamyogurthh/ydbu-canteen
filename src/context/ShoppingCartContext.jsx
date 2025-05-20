'use client'
import { createContext, useContext, useState } from 'react'

const ShoppingCartContext = createContext()

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id) {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }]
      } else {
        return currItem.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id)?.quantity === 1) {
        return currItem.filter((item) => item.id !== id)
      } else {
        return currItem.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id) {
    setCartItems((currItem) => {
      return currItem.filter((item) => item.id !== id)
    })
  }

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        isOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
