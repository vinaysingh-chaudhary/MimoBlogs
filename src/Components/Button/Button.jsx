import React from 'react'

const Button = ({label, ...props}) => {
  return (
    <button className=' px-6 py-3 text-white rounded-[50px] bg-[#454545] shadow-[#6e6e6e] hover:bg-[#2F2F2F] hover:scale-110 transition-transform duration-150 shadow-sm active:bg-[#454545] active:scale-100' {...props}>
      {label}
    </button>
  )
}

export default Button
