"use client"

import dynamic from 'next/dynamic'

// import RegisterForm from "../../../components/auth/register-form";

const RegisterForm = dynamic(() => import("../../../components/auth/register-form"), {
  ssr: false, 
});


const RegisterPage = () => {
  return (
    <div className='flex justify-center items-center w-full'>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage

