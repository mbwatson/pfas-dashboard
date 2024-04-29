import { Typography } from '@mui/joy'
import { useAuth } from '@context'
import { ContentPage } from '@components/layout'

export const HomeView = () => {
  const { user } = useAuth()

  return (
    <ContentPage>
      { user
        ? <Typography>Welcome, { user.name }!</Typography>
        : <Typography>Welcome! Please log in.</Typography>
      }
    </ContentPage>
  )
}