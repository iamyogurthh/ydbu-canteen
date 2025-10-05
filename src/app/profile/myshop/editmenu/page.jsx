'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'

const Page = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [data, setData] = useState({
    name: '',
    price: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getPrevMenuData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`http://localhost:3000/api/menus/${id}`)
        const fetched = await res.json()
        setData({ name: fetched.name, price: fetched.price })
        setPreviewUrl(fetched.img || '/system_icons/placeholder-menu.png') // existing image
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    if (id) getPrevMenuData()
  }, [id])

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', Number(data.price))
    if (image) {
      // New image file selected
      formData.append('img', image)
    } else {
      // No new image, send original image URL string from previewUrl
      formData.append('img', previewUrl) // send as string
    }
    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update menu')

      router.push('/profile/myshop')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FullScreenLoader />

  return (
    <div className="pt-10 pl-10">
      <h1 className="font-bold text-[24px] mb-[24px]">Edit Menu</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="img">
          <img
            src={previewUrl || '/system_icons/placeholder-menu.png'}
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg inline-block w-[252px] h-[152px] object-fill cursor-pointer"
            alt="Menu Preview"
          />
          <p className="text-center text-accent w-[252px] mt-[16px] mb-[24px]">
            Set New Menu Item Image
          </p>
        </label>
        <input
          id="img"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setImage(file)
              setPreviewUrl(URL.createObjectURL(file))
            }
          }}
        />

        <label htmlFor="name" className="font-semibold">
          Menu Name
        </label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter item name"
          className="border-[2px] border-[#D72222] bg-white px-[16px] mt-[8px] mb-[24px] py-[13px] rounded w-[400px]"
          onChange={onChangeHandler}
          value={data.name}
        />
        <br />

        <label htmlFor="price" className="font-semibold">
          Menu Price
        </label>
        <br />
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter item price"
          className="border-[2px] border-[#D72222] bg-white px-[16px] mt-[8px] mb-[40px] py-[13px] rounded w-[400px]"
          onChange={onChangeHandler}
          value={data.price}
        />
        <br />

        <button
          type="submit"
          className="cursor-pointer bg-accent text-white py-[12px] rounded-[24px] text-[16px] font-semibold w-[191px]"
        >
          Update Menu
        </button>
      </form>
    </div>
  )
}

export default Page
