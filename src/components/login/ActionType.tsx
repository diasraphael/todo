import Button from '../common/Button'

interface ActionTypeProps {
  action: string
  setAction: React.Dispatch<React.SetStateAction<string>>
}
export const ActionType = ({ action, setAction }: ActionTypeProps) => {
  return (
    <div className="flex gap-8 mt-12">
      <Button
        className={
          action == 'Sign Up' ? 'bg-[#e8f5fd]' : 'bg-[#EAEAEA] text-[#676767]'
        }
        type="button"
        onClick={() => {
          setAction('Sign Up')
        }}>
        SignUp
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

