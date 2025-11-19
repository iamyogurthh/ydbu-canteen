'use client'

import React, { useState, useEffect } from 'react'
import FullScreenLoader from '@/components/FullScreenLoader'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CreateCanteenPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [form, setForm] = useState({
    canteen_name: '',
    ph_no: '',
    user_name: '',
    nrc: '',
    current_address: '',
    password: '',
    cover_img: '',
    profile_img: '',
  })

  const [previewUrls, setPreviewUrls] = useState({
    cover_img: '',
    profile_img: '',
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrls.cover_img?.startsWith('blob:'))
        URL.revokeObjectURL(previewUrls.cover_img)
      if (previewUrls.profile_img?.startsWith('blob:'))
        URL.revokeObjectURL(previewUrls.profile_img)
    }
  }, [previewUrls])

  if (status === 'loading') return <FullScreenLoader />

  if (!session || session?.user?.role_id === 1) redirect('/')
  if (session?.user?.role_id === 2) redirect('/canteenOwner')

  const validate = () => {
    const newErrors = {}

    if (!form.user_name) newErrors.user_name = 'User name is required'
    if (!form.ph_no) newErrors.ph_no = 'Phone number is required'
    if (!form.nrc) newErrors.nrc = 'NRC number is required'
    if (!form.current_address)
      newErrors.current_address = 'Current address is required'
    if (!form.password) newErrors.password = 'Password is required'

    if (!form.canteen_name) newErrors.canteen_name = 'Canteen name is required'
    if (!form.cover_img) newErrors.cover_img = 'Cover image is required'
    if (!form.profile_img) newErrors.profile_img = 'Profile image is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLoading) return
    if (!validate()) return

    try {
      setIsLoading(true)
      const body = new FormData()

      Object.keys(form).forEach((key) => {
        body.append(key, form[key])
      })

      const res = await fetch('/api/canteens/', {
        method: 'POST',
        body,
      })

      if (!res.ok) throw new Error('Failed to create canteen')

      const result = await res.json()
      alert(result.message || 'Canteen Created Successfully!')
      router.push('/canteenOwner/myshop')
    } catch (err) {
      console.error(err)
      alert(err.message || 'Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <FullScreenLoader />

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-accent">
        Create New Canteen
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* =================== OWNER SECTION =================== */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-accent border-l-4 border-accent pl-3">
            Owner Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Name */}
            <div>
              <label className="font-medium">User Name</label>
              <input
                type="text"
                className="input"
                placeholder="Enter owner name"
                value={form.user_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, user_name: e.target.value }))
                }
              />
              {errors.user_name && (
                <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="text"
                className="input"
                placeholder="Enter phone number"
                value={form.ph_no}
                onChange={(e) =>
                  setForm((p) => ({ ...p, ph_no: e.target.value }))
                }
              />
              {errors.ph_no && (
                <p className="text-red-500 text-sm mt-1">{errors.ph_no}</p>
              )}
            </div>

            {/* NRC */}
            <div>
              <label className="font-medium">NRC</label>
              <input
                type="text"
                className="input"
                placeholder="Enter NRC"
                value={form.nrc}
                onChange={(e) =>
                  setForm((p) => ({ ...p, nrc: e.target.value }))
                }
              />
              {errors.nrc && (
                <p className="text-red-500 text-sm mt-1">{errors.nrc}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="font-medium">Current Address</label>
              <input
                type="text"
                className="input"
                placeholder="Enter address"
                value={form.current_address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, current_address: e.target.value }))
                }
              />
              {errors.current_address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.current_address}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </div>

        {/* =================== CANTEEN SECTION =================== */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-accent border-l-4 border-accent pl-3">
            Canteen Information
          </h2>

          {/* Canteen Name */}
          <div className="mb-6">
            <label className="font-medium">Canteen Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter canteen name"
              value={form.canteen_name}
              onChange={(e) =>
                setForm((p) => ({ ...p, canteen_name: e.target.value }))
              }
            />
            {errors.canteen_name && (
              <p className="text-red-500 text-sm mt-1">{errors.canteen_name}</p>
            )}
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cover Image */}
            <div className="text-center">
              <label htmlFor="cover_img" className="cursor-pointer block">
                <img
                  src={
                    previewUrls.cover_img ||
                    '/system_icons/placeholder-canteen.jpg'
                  }
                  className="rounded-xl shadow w-full h-[220px] object-cover"
                />
                <p className="text-accent mt-3">Upload Cover Image</p>
              </label>
              <input
                id="cover_img"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setForm((p) => ({ ...p, cover_img: file }))
                    setPreviewUrls((p) => ({
                      ...p,
                      cover_img: URL.createObjectURL(file),
                    }))
                  }
                }}
              />
              {errors.cover_img && (
                <p className="text-red-500 text-sm mt-1">{errors.cover_img}</p>
              )}
            </div>

            {/* Profile Image */}
            <div className="text-center">
              <label htmlFor="profile_img" className="cursor-pointer block">
                <img
                  src={
                    previewUrls.profile_img ||
                    '/system_icons/placeholder-menu.png'
                  }
                  className="rounded-xl shadow w-full h-[220px] object-cover"
                />
                <p className="text-accent mt-3">Upload Profile Image</p>
              </label>
              <input
                id="profile_img"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setForm((p) => ({ ...p, profile_img: file }))
                    setPreviewUrls((p) => ({
                      ...p,
                      profile_img: URL.createObjectURL(file),
                    }))
                  }
                }}
              />
              {errors.profile_img && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profile_img}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-accent text-white px-8 py-3 rounded-xl font-semibold text-lg shadow hover:opacity-90 disabled:opacity-40"
          >
            {isLoading ? 'Creating...' : 'Create Canteen'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCanteenPage
