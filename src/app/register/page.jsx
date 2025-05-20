import React from 'react'

const page = () => {
  const formElementData = [
    {
      label: 'Phone number',
      placeholder: 'Enter your Phone number*',
      type: 'phone',
      id: 'ph_no',
    },
    {
      label: 'Name',
      placeholder: 'Enter your Name*',
      type: 'text',
      id: 'name',
    },
    {
      label: 'NRC',
      placeholder: 'Enter your nrc number*',
      type: 'text',
      id: 'nrc',
    },
    {
      label: 'Roll-Number',
      placeholder: 'Enter your roll number*',
      type: 'text',
      id: 'roll_no',
    },
    {
      label: 'Major',
      placeholder: 'Enter your Major*',
      type: 'text',
      id: 'major',
    },
    {
      label: 'Current Address',
      placeholder: 'Enter your current address*',
      type: 'text',
      id: 'address',
    },
    {
      label: 'Password',
      placeholder: 'Enter your password*',
      type: 'password',
      id: 'password',
    },
    {
      label: 'Confirm Password',
      placeholder: 'Confirm your password*',
      type: 'password',
      id: 'confirmPwd',
    },
  ]

  return (
    <div className="flex items-center justify-center mt-[117px]">
      <div className="bg-white px-[400px] pt-[40px] pb-[80px] rounded-[24px] shadow-lg">
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
          <h1 className="text-[24px] text-accent underline mb-[24px]">
            Register
          </h1>
          {formElementData.map((fe, index) => (
            <div key={index} className="flex flex-col mb-[24px]">
              <label htmlFor={fe.id} className="mb-[8px]">
                {fe.label}
              </label>
              <input
                id={fe.id}
                type={fe.type}
                placeholder={fe.placeholder}
                className="border-[2px] border-[#777777] px-[16px] py-[13px] rounded"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-accent text-white w-full py-[12px] rounded text-[16px] font-semibold"
          >
            Register
          </button>

          <p className="text-center mt-[24px] text-sm">
            Already had an account?{' '}
            <a
              href="/login"
              className="text-accent font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page
