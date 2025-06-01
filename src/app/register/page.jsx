'use client'

import React, { useState } from 'react'

const page = () => {
  const [phone,setPhone] = useState('');
  const [name,setName] = useState('');
  const [nrc,setNrc] = useState('');
  const [roll,setRoll] = useState('');
  const [major,setMajor] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCpassword] = useState('');
  const [error , setError] = useState(null);
  async function handleSubmit(e){
    e.preventDefault();
    if(password !== cpassword){
      setError("Password and Confirm Password doesn't match");
      return;
    }
    const formData = new FormData();
    formData.append("ph_no",phone);
    formData.append('name',name);
    formData.append('nrc',nrc);
    formData.append('roll_no',roll);
    formData.append('major',major);
    formData.append('current_address',address);
    formData.append('password',password);
    const res = await fetch('http://localhost:3000/api/auth/register',{
      method : 'POST',
      body : formData
    })
    if(res?.ok){
      console.log("Success register")
    }
  }

  const formElementData = [
    {
      label: 'Phone number',
      placeholder: 'Enter your Phone number*',
      type: 'phone',
      id: 'ph_no',
      handleChange(e){
        setPhone(e.target.value);
      }
    },
    {
      label: 'Name',
      placeholder: 'Enter your Name*',
      type: 'text',
      id: 'name',
      handleChange(e){
        setName(e.target.value);
      }
    },
    {
      label: 'NRC',
      placeholder: 'Enter your nrc number*',
      type: 'text',
      id: 'nrc',
      handleChange(e){
        setNrc(e.target.value);
      }
    },
    {
      label: 'Roll-Number',
      placeholder: 'Enter your roll number*',
      type: 'text',
      id: 'roll_no',
      handleChange(e){
        setRoll(e.target.value);
      }
    },
    {
      label: 'Major',
      placeholder: 'Enter your Major*',
      type: 'text',
      id: 'major',
      handleChange(e){
        setMajor(e.target.value);
      }
    },
    {
      label: 'Current Address',
      placeholder: 'Enter your current address*',
      type: 'text',
      id: 'address',
      handleChange(e){
        setAddress(e.target.value);
      }
    },
    {
      label: 'Password',
      placeholder: 'Enter your password*',
      type: 'password',
      id: 'password',
      handleChange(e){
        setPassword(e.target.value);
      }
    },
    {
      label: 'Confirm Password',
      placeholder: 'Confirm your password*',
      type: 'password',
      id: 'confirmPwd',
      handleChange(e){
        setCpassword(e.target.value);
      }
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

        <form className="mt-[40px]" onSubmit={handleSubmit}>
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
                onChange={(e) => fe.handleChange(e)}
              />
            </div>
          ))}

          <button
            type="submit"
            className="cursor-pointer bg-accent text-white w-full py-[12px] rounded text-[16px] font-semibold"
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
