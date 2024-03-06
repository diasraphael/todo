// SignUp.js
import React, { useState } from 'react'
import axios from 'axios'

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault() // Prevent the default form submission behavior
    // Handle form submission

    try {
      const response = await axios.post('/api/signup', formData)
      console.log(response.data)
      // Redirect to login or dashboard
    } catch (error) {
      console.error('Sign up failed:', error)
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
