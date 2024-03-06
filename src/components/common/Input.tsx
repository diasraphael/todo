import React from 'react'

interface InputProps {
  type: string
  img: string
  altText: string
  title: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  img,
  altText,
  title,
  placeholder,
  onChange
}: InputProps) => {
  return (
    <div className="flex items-center m-auto w-96 h-20 bg-[#eaeaea] rounded-md">
      <img className="mx-8 my-0" src={img} alt={altText} />
      <input
        className="h-12 w-96 bg-transparent border-none outline-none text-xl text-[#797979]"
        type={type}
        title={title}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
