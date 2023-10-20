import React from 'react'
import { SignUpForm } from '../../Components/compConfig'
import { useSelector } from 'react-redux'

const SignUpPage = () => {

  const userData = useSelector(store => store.authentication.userData)
  console.log(userData);

  return (
    <div>
        <SignUpForm />
    </div>
  )
}

export default SignUpPage
