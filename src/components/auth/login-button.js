import { Button } from '@mui/joy'
import {
  Login as LoginIcon,
} from '@mui/icons-material'
import { useAppContext } from '@context'

export const LoginButton = () => {
  const { auth } = useAppContext()

  return (
    <Button
      variant="soft"
      size="lg"
      onClick={ auth.login }
      startDecorator={ <LoginIcon /> }
    >Login</Button>
  )
}
