'use client'

import FullScreenLoader from '@/components/FullScreenLoader'
import { useShoppingCart } from '@/context/ShoppingCartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const { cartItems, setCartItems } = useShoppingCart()
  const { data: session, status } = useSession()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [major, setMajor] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [note, setNote] = useState('')
  const router = useRouter()
  if (status == 'loading') {
    return <FullScreenLoader />
  }

  console.log(cartItems)

  async function handleSubmit(event) {
    event.preventDefault()
    cartItems.push({
      user_id: session.user.id,
      name,
      phone,
      major,
      current_location: currentLocation,
      special_request: note,
    })
    console.log('This is from submit', cartItems)
    console.log(name, phone, major, currentLocation, note)

    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(cartItems),
    })
    if (res.ok) {
      console.log('I am oking')
      setCartItems([])
      router.push('/')
    }
  }
  const formElementData = [
    {
      label: 'Name',
      placeholder: 'Enter your Name*',
      type: 'text',
      id: 'name',
      handleChange(e) {
        setName(e.target.value)
      },
    },
    {
      label: 'Phone',
      placeholder: 'Enter your Phone number*',
      type: 'phone',
      id: 'ph_no',
      handleChange(e) {
        setPhone(e.target.value)
      },
    },
    {
      label: 'Major',
      placeholder: 'Enter your Major*',
      type: 'text',
      id: 'major',
      handleChange(e) {
        setMajor(e.target.value)
      },
    },
    {
      label: 'Current Location',
      placeholder: 'Enter your Current location correctly*',
      type: 'textarea',
      id: 'address',
      custom_h: 'h-[120px]',
      handleChange(e) {
        setCurrentLocation(e.target.value)
      },
    },
    {
      label: 'Note',
      placeholder: 'Enter your note (optional)',
      type: 'textarea',
      id: 'note',
      custom_h: 'h-[120px]',
      handleChange(e) {
        setNote(e.target.value)
      },
    },
  ]

  return (
    <div className="flex items-center justify-center mt-[88px] px-[16px]">
      <div className="bg-white w-full px-[400px] pt-[40px] pb-[80px] rounded-[24px] shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-[32px] font-medium text-accent">Checkout</h1>
        </div>

        <form
          className="mt-[40px] flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {formElementData.map((fe, index) => (
            <div key={index} className="flex flex-col mb-[24px]">
              <label htmlFor={fe.id} className="mb-[8px]">
                {fe.label}
              </label>

              {fe.type === 'textarea' ? (
                <textarea
                  id={fe.id}
                  placeholder={fe.placeholder}
                  onChange={(e) => fe.handleChange(e)}
                  className={`border-[2px] border-[#777777] px-[16px] py-[13px] rounded w-[400px] resize-none ${
                    fe.custom_h ? `${fe.custom_h}` : 'h-[120px]'
                  }`}
                  required={fe.id === 'note'}
                />
              ) : (
                <input
                  id={fe.id}
                  type={fe.type}
                  placeholder={fe.placeholder}
                  onChange={(e) => fe.handleChange(e)}
                  className={`border-[2px] border-[#777777] px-[16px] py-[13px] rounded w-[400px] ${
                    fe.custom_h ? `${fe.custom_h}` : ''
                  }`}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="cursor-pointer bg-accent text-white  py-[12px] rounded text-[16px] font-semibold w-[400px]"
          >
            Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
