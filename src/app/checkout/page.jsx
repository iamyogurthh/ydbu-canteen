import React from 'react'

const page = () => {
  const formElementData = [
    {
      label: 'Name',
      placeholder: 'Enter your Name*',
      type: 'text',
      id: 'name',
    },
    {
      label: 'Phone',
      placeholder: 'Enter your Phone number*',
      type: 'phone',
      id: 'ph_no',
    },
    {
      label: 'Major',
      placeholder: 'Enter your Major*',
      type: 'text',
      id: 'major',
    },
    {
      label: 'Current Location',
      placeholder: 'Enter your Current location correctly*',
      type: 'textarea',
      id: 'address',
      custom_h: 'h-[120px]',
    },
    {
      label: 'Note',
      placeholder: 'Enter your note (optional)',
      type: 'textarea',
      id: 'note',
      custom_h: 'h-[120px]',
    },
  ]

  console.log(formElementData)
  return (
    <div className="flex items-center justify-center mt-[88px] px-[16px]">
      <div className="bg-white w-full px-[400px] pt-[40px] pb-[80px] rounded-[24px] shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-[32px] font-medium text-accent">Checkout</h1>
        </div>

        <form className="mt-[40px] flex flex-col items-center">
          {formElementData.map((fe, index) => (
            <div key={index} className="flex flex-col mb-[24px]">
              <label htmlFor={fe.id} className="mb-[8px]">
                {fe.label}
              </label>

              {fe.type === 'textarea' ? (
                <textarea
                  id={fe.id}
                  placeholder={fe.placeholder}
                  className={`border-[2px] border-[#777777] px-[16px] py-[13px] rounded w-[400px] resize-none ${
                    fe.custom_h ? `${fe.custom_h}` : 'h-[120px]'
                  }`}
                />
              ) : (
                <input
                  id={fe.id}
                  type={fe.type}
                  placeholder={fe.placeholder}
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
