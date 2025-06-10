import ProfileSidebar from '@/components/profile/ProfileSidebar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className="flex pt-[70px] ">
      <ProfileSidebar />
      <div className="pl-[280px]  w-full">{children}</div>
    </div>
  )
}

export default layout
