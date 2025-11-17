'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'
import { redirect, useRouter } from 'next/navigation'

const Page = () => {
  useEffect(() => {
    if (!session) return
    const getPrevProfileData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`http://localhost:3000/api/canteens/self/${id}`)
        const data = await res.json()
        setData({
          name: data.name,
          profile_img: '',
          cover_img: '',
        })
        setPreviewUrls({
          profile_img: data.profile_img,
          cover_img: data.cover_img,
        })
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    if (id) getPrevProfileData()
  }, [id, session])

  useEffect(() => {
    return () => {
      if (previewUrls.cover_img?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrls.cover_img)
      }
      if (previewUrls.profile_img?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrls.profile_img)
      }
    }
  }, [previewUrls])
  const router = useRouter()
  const { data: session , status } = useSession()
  const id = session?.user?.canteen_id

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

  if(status === 'loading' ){
    return <FullScreenLoader/>
  }else if(!session || session.user.role_id == 1){
    redirect('/');
  }else if(session.user.role_id == 3){
    redirect('/admin');
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)

    // Helper to convert image URL to File
    const urlToFile = async (url, filename) => {
      const response = await fetch(url)
      const blob = await response.blob()
      return new File([blob], filename, { type: blob.type })
    }

    const finalProfileImg =
      data.profile_img instanceof File
        ? data.profile_img
        : await urlToFile(previewUrls.profile_img, 'profile_img.jpg')

    const finalCoverImg =
      data.cover_img instanceof File
        ? data.cover_img
        : await urlToFile(previewUrls.cover_img, 'cover_img.jpg')

    formData.append('profile_img', finalProfileImg)
    formData.append('cover_img', finalCoverImg)

    try {
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/canteens/self/${id}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update profile')

      router.push('/canteenOwner/myshop')
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FullScreenLoader />

  return (
    <div className="px-10 py-10">
      <h1 className="text-[24px] font-semibold mb-[24px]">Edit Profile</h1>
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
            Set New Cover Image
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
            alt="Menu Preview"
          />
          <p className="text-center text-accent w-[252px] mt-[16px] mb-[24px]">
            Set New Profile Image
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

        {/* Shop Name */}
        <label htmlFor="name" className="font-semibold">
          Shop Name
        </label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter shop name"
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
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Page
