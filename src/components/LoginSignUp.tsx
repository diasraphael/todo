import React, { useState } from 'react'
import Input from './common/Input'
import Button from './common/Button'

const LoginSignUp = () => {
  const [action, setAction] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form className="flex flex-col m-auto mt-52 bg-white pb-7 w-[600px]">
      <div className="flex flex-col items-center gap-10 w-full mt-10">
        <div className="text-5xl font-bold">Planner {action}</div>
        <div className="border-b-4 w-40"></div>
      </div>
      <div className="mt-14 flex flex-col gap-6">
        {action === 'Login' ? (
          <></>
        ) : (
          <Input
            type="text"
            img="/assets/username.png"
            altText="Username"
            title="Username"
            onChange={handleChange}
            placeholder="Enter Username"></Input>
        )}
        <Input
          title="Email"
          placeholder="Enter Email"
          type="email"
          img="/assets/email.png"
          onChange={handleChange}
          altText="Email"></Input>
        <Input
          title="Password"
          placeholder="Enter Password"
          type="password"
          img="/assets/password.png"
          onChange={handleChange}
          altText="Password"></Input>
      </div>
      {action === 'Sign Up' ? (
        <></>
      ) : (
        <div className="pl-28 pt-8 text-[#797979] text-xl">
          Forgot Password
          <span className="text-black cursor-pointer pl-2">Click here!</span>
        </div>
      )}
      <div className="flex gap-8 mt-12 m-auto">
        <Button
          className={action === 'Login' ? 'bg-[#EAEAEA] text-[#676767]' : ''}
          type="submit"
          onClick={() => {
            setAction('Sign Up')
            console.log(formData)
          }}>
          SignUp
        </Button>
        <Button
          className={action === 'Sign Up' ? 'bg-[#EAEAEA] text-[#676767]' : ''}
          type="submit"
          onClick={() => {
            setAction('Login')
            console.log(formData)
          }}>
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginSignUp
