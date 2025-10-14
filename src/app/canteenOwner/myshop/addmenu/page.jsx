'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'

const page = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: '',
    price: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((prevData) => {
      const newData = { ...prevData, [name]: value }
      return newData
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('canteen_id', session.user.canteen_id)
    formData.append('name', data.name)
    formData.append('price', Number(data.price))
    formData.append('img', image)
    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/menus`, {
        method: 'POST',
        body: formData,
      })

      router.push('/canteenOwner/myshop')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <div className="pt-10 pl-10">
      <h1 className="font-bold text-[24px] mb-[24px]">Add Menu</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="img">
          <img
            src={
              !image
                ? '/system_icons/placeholder-menu.png'
                : URL.createObjectURL(image)
            }
            width={252}
            height={152}
            className="rounded-[16px] shadow-lg inline-block  w-[252px] h-[152px] object-fill cursor-pointer"
          />
          <p className="text-center text-accent w-[252px] mt-[16px] mb-[24px]">
            Set Menu Item Image
          </p>
        </label>
        <input
          id="img"
          type="file"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label htmlFor="name" className="font-semibold">
          Menu Name
        </label>
        <br />
        <input
          id="name"
          name="name"
          type={'text'}
          placeholder="Enter item name"
          className="border-[2px] border-[#D72222] bg-white px-[16px] mt-[8px] mb-[24px] py-[13px] rounded w-[400px]"
          onChange={onChangeHandler}
          value={data.name}
        />
        <br></br>

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
        <br></br>
        <button
          type="submit"
          className="cursor-pointer bg-accent text-white  py-[12px] rounded-[24px] text-[16px] font-semibold w-[191px]"
        >
          Add Menu
        </button>
      </form>
    </div>
  )
}

export default page
