import { Typography } from '@mui/joy'
import { useAuth } from '@context'
import { ContentPage } from '@components/layout'
import { Dashboard } from '@components/dashboard'

export const HomeView = () => {
  const { user } = useAuth()

  return (
    <ContentPage sx={{
      maxWidth: 'unset',
      minWidth: '100vw',
    }}>
      { user
        ? <Dashboard />
        : <Typography>Welcome! Please log in.</Typography>
      }
    </ContentPage>
  )
}