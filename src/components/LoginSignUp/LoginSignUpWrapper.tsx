import React, { useState } from 'react'
import Button from '../common/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoginSignUp, User } from './LoginSignUp'
import { ActionType } from './ActionType'
export const LoginSignUpWrapper = () => {
  const [action, setAction] = useState('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const addNewUser = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/create',
        {
          email: formData.email,
          password: formData.password,
          username: formData.username
        }
      )
      return response.data
    } catch (error) {
      console.log(error)
      setError('Add User Failed')
    }
  }

  const loginUser = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8000/api/user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        data: {
          email: formData.email,
          password: formData.password
        }
      })
      return response.data
    } catch (error) {
      setError('Login Failed')
    }
  }

  return (
    <div className="m-12">
      <form className="flex flex-col m-auto pb-7 w-[600px] min-h-[100vh] items-center">
        <div className="flex flex-col items-center gap-10 w-full mt-10">
          <div className="text-5xl font-bold text-black">Planner {action}</div>
          <div className="border-b-4 w-40"></div>
        </div>
        <ActionType action={action} setAction={setAction}></ActionType>
        {action && (
          <>
            <LoginSignUp
              formData={formData}
              setFormData={setFormData}
              action={action}></LoginSignUp>

            <div className="flex gap-8 my-8">
              <Button
                className={'bg-[#789bed69] text-[#676767]'}
                type="submit"
                onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault()
                  if (
                    formData.email &&
                    formData.username &&
                    formData.password
                  ) {
                    const response = await addNewUser()
                    if (response) {
                      navigate('/dashboard', { state: { response } })
                    }
                  } else if (formData.email && formData.password) {
                    const response = await loginUser()
                    if (response) {
                      navigate('/dashboard', { state: { response } })
                    }
                  } else {
                    setError('Form data missing')
                  }
                }}>
                Submit
              </Button>
            </div>
            {error && (
              <div className="text-sm my-1 text-red-700 text-center pt-4">
                {error}
              </div>
            )}
          </>
        )}
      </form>
    </div>
  )
}
