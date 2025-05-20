import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center mt-[117px]">
      <div className="bg-white px-[40px] pt-[40px] pb-[80px] rounded-[24px] shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-[48px] font-medium mr-[16px]">Welcome To</h1>
          <div className="text-left">
            <h1 className="text-[48px] text-accent font-bold mb-[-8px]">
              YDBU
            </h1>
            <p className="text-[24px] font-medium text-black">Online Canteen</p>
          </div>
        </div>

        <form className="mt-[40px]">
          <h1 className="text-[24px] text-accent underline mb-[24px]">Login</h1>

          <div className="flex flex-col mb-[24px]">
            <label htmlFor="ph_no" className="mb-[8px]">
              Phone number
            </label>
            <input
              id="ph_no"
              type="text"
              placeholder="Enter your Phone number *"
              className="border-[2px] border-[#777777] px-[16px] py-[13px] rounded"
            />
          </div>

          <div className="flex flex-col mb-[24px]">
            <label htmlFor="password" className="mb-[8px]">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password *"
              className="border-[2px] border-[#777777] px-[16px] py-[13px] rounded"
            />
          </div>

          <div className="flex items-center mb-[24px]">
            <input type="checkbox" id="remember" className="mr-[8px]" />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-accent text-white w-full py-[12px] rounded text-[16px] font-semibold"
          >
            Login
          </button>

          <p className="text-center mt-[24px] text-sm">
            Don’t have an account?{' '}
            <a
              href="/register"
              className="text-accent font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page
