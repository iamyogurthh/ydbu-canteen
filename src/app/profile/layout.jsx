import ProfileSidebar from '@/components/profile/ProfileSidebar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div className="flex pt-[70px]">
      {/* Sidebar only visible on md+ */}
      <ProfileSidebar />

      <div
        className="
          w-full 
          md:pl-[240px]   /* space for sidebar on desktop */
          px-4            /* padding for mobile */
        "
      >
        {children}
      </div>
    </div>
  )
}

export default layout
