import React from 'react'

interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined
  children: React.ReactNode
  className: string
  onClick: () => void
}

const Button = ({ type, children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center w-[120px] h-[60px] text-[black] rounded-full text-xl font-bold cursor-pointer bg-[#e8f5fd] ${className}`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
