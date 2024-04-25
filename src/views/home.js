import { Typography } from '@mui/joy'
import { useAuth } from '@context'
import { ContentPage } from '@components/layout'
import { DataBrowser } from '@components/data-browser'
import 'react-json-view-lite/dist/index.css'

export const HomeView = () => {
  const { user } = useAuth()

  return (
    <ContentPage>
      { user
        ? <DataBrowser />
        : <Typography>Welcome! Please log in.</Typography>
      }
    </ContentPage>
  )
}