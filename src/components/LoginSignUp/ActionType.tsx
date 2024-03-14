import Button from '../common/Button'
import { SIGN_UP } from '../util/constant'

interface ActionTypeProps {
  setAction: (action: string) => void
  action: string
}

export const ActionType = ({ action, setAction }: ActionTypeProps) => {
  return (
    <div className="flex gap-8 mt-12 m-auto">
      <Button
        className={
          action == SIGN_UP ? 'bg-[#e8f5fd]' : 'bg-[#EAEAEA] text-[#676767]'
        }
        type="button"
        onClick={() => {
          setAction('Sign Up')
        }}>
        Sign Up
      </Button>
      <Button
        className={
          action == 'Login' ? 'bg-[#e8f5fd]' : 'bg-[#EAEAEA] text-[#676767]'
        }
        type="button"
        onClick={() => {
          setAction('Login')
        }}>
        Login
      </Button>
    </div>
  )
}
