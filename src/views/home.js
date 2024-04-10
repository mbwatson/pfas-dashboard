import { Typography } from '@mui/joy'
import { ContentPage } from '@components/layout'
import { useAuth } from '@context'

export const HomeView = () => {
  const { user } = useAuth()

  return (
    <ContentPage>
      {
        user ? (
          <Typography>Welcome, { user.name }!</Typography>
        ) : (
          <Typography>Welcome! Please log in.</Typography>
        )
      }
    </ContentPage>
  )
}