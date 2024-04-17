import Input from '../common/Input'
import { LOGIN, SIGN_UP } from '../util/constant'

export type User = {
  username: string
  email: string
  password: string
}

interface LoginSignUpProps {
  formData: User
  setFormData: React.Dispatch<React.SetStateAction<User>>
  action: string
}

export const LoginSignUp = ({
  formData,
  setFormData,
  action
}: LoginSignUpProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="mt-14 flex flex-col gap-6">
        {action === LOGIN ? (
          <></>
        ) : (
          <Input
            type="text"
            img="/assets/username.png"
            altText="Username"
            title="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"></Input>
        )}
        <Input
          title="Email"
          placeholder="Enter Email"
          type="email"
          name="email"
          img="/assets/email.png"
          onChange={handleChange}
          value={formData.email}
          altText="Email"></Input>
        <Input
          title="Password"
          placeholder="Enter Password"
          type="password"
          name="password"
          img="/assets/password.png"
          onChange={handleChange}
          value={formData.password}
          altText="Password"></Input>
      </div>
      {action === SIGN_UP && (
        <div className="text-center py-8 text-[#797979] text-xl">
          Forgot Password
          <span className="text-black cursor-pointer pl-2">Click here!</span>
        </div>
      )}
    </div>
  )
}
