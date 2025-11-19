'use client'

import React, { useState, useEffect } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CreateCanteenPage = () => {
  const {data : session , status} = useSession();
  const router = useRouter()

  const [data, setData] = useState({
    name: '',
    profile_img: '',
    cover_img: '',
  })

  const [previewUrls, setPreviewUrls] = useState({
    profile_img: '',
    cover_img: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  // Cleanup object URLs when component unmounts or previews change
  useEffect(() => {
    return () => {
      if (previewUrls.cover_img?.startsWith('blob:'))
        URL.revokeObjectURL(previewUrls.cover_img)
      if (previewUrls.profile_img?.startsWith('blob:'))
        URL.revokeObjectURL(previewUrls.profile_img)
    }
  }, [previewUrls])

  if (status === 'loading') {
    return <FullScreenLoader />
  } else {
    if (!session || session?.user?.role_id == 1) {
      redirect('/')
    } else if (session?.user?.role_id == 2) {
      redirect('/canteenOwner')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data.name) {
      alert('Please enter a canteen name')
      return
    }
    if (!data.cover_img || !data.profile_img) {
      alert('Please upload both cover and profile images')
      return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('profile_img', data.profile_img)
    formData.append('cover_img', data.cover_img)

    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3000/api/canteens/', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to create canteen')

      const result = await res.json()
      alert(result.message || 'Canteen Created Successfully!')
      router.push('/canteenOwner/myshop') // redirect to dashboard
    } catch (err) {
      console.error(err)
      alert(err.message || 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FullScreenLoader />

  return (
    <div className="px-10 py-10">
      <h1 className="text-[24px] font-semibold mb-[24px]">
        Create New Canteen
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Cover Image */}
        <label htmlFor="cover_img">
          <img
            src={
              previewUrls.cover_img || '/system_icons/placeholder-canteen.jpg'
            }
            className="rounded-[16px] shadow-lg inline-block w-full h-[207px] object-cover opacity-[70%] cursor-pointer"
            alt="Cover Image"
          />
          <p className="text-center text-accent w-full mt-[16px] mb-[24px]">
            Set Cover Image
          </p>
        </label>
        <input
          id="cover_img"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setData((prev) => ({ ...prev, cover_img: file }))
              const url = URL.createObjectURL(file)
              setPreviewUrls((prev) => ({ ...prev, cover_img: url }))
            }
          }}
        />

        {/* Profile Image */}
        <label htmlFor="profile_img">
          <img
            src={
              previewUrls.profile_img || '/system_icons/placeholder-menu.png'
            }
            className="rounded-[16px] shadow-lg inline-block w-[267px] h-[150px] object-cover cursor-pointer"
            alt="Profile Image"
          />
          <p className="text-center text-accent w-[252px] mt-[16px] mb-[24px]">
            Set Profile Image
          </p>
        </label>
        <input
          id="profile_img"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setData((prev) => ({ ...prev, profile_img: file }))
              const url = URL.createObjectURL(file)
              setPreviewUrls((prev) => ({ ...prev, profile_img: url }))
            }
          }}
        />

        {/* Canteen Name */}
        <label htmlFor="name" className="font-semibold">
          Canteen Name
        </label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter canteen name"
          value={data.name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border-[2px] border-[#D72222] bg-white px-[16px] mt-[8px] mb-[24px] py-[13px] rounded w-[400px]"
        />
        <br />

        <button
          type="submit"
          className="cursor-pointer bg-accent text-white py-[12px] rounded-[24px] text-[16px] font-semibold w-[191px]"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Canteen'}
        </button>
      </form>
    </div>
  )
}

export default CreateCanteenPage
