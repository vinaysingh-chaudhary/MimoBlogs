import React from 'react'
import { SignUpForm } from '../../Components/compConfig'
import { useSelector } from 'react-redux'

const SignUpPage = () => {

  const userData = useSelector(store => store.authentication.userData)
  console.log(userData);

  return (
    <div className=' absolute top-0 left-0 w-screen h-screen bg-white'>
        <SignUpForm />
    </div>
  )
}

export default SignUpPage
