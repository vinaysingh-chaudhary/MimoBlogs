import React from 'react'

const Button = ({label, ...props}) => {
  return (
    <button className=' text-white bg-purple-500 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-500 dark:focus:ring-purple-900' {...props}>
      {label}
    </button>
  )
}

export default Button
