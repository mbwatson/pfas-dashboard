import { Fragment, useCallback } from 'react'
import { Typography } from '@mui/joy'
import { ContentPage } from '@components/layout'
import { useAppContext, useAuth } from '@context'

export const HomeView = () => {
  const { data } = useAppContext()
  console.log(data)
  const { user } = useAuth()

  const RawData = useCallback(() => (
    <pre>
      { JSON.stringify(data.dustSamples, null, 2) }
    </pre>
  ), [data])

  return (
    <ContentPage>
      {
        user ? (
          <Fragment>
            <Typography>Welcome, { user.name }!</Typography>
            <RawData />
          </Fragment>
        ) : (
          <Typography>Welcome! Please log in.</Typography>
        )
      }
    </ContentPage>
  )
}