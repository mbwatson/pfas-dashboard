import { Fragment, useCallback } from 'react'
import { Box, Tab, TabPanel, TabList, Tabs, Typography } from '@mui/joy'
import { ContentPage } from '@components/layout'
import { useAppContext, useAuth } from '@context'
import { darkStyles, defaultStyles, JsonView } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

export const HomeView = () => {
  const { data, preferences } = useAppContext()
  const keys = Object.keys(data)

  console.log(data)

  const { user } = useAuth()

  const RawData = useCallback(() => (
    <Box>
      <Tabs defaultValue={ 0 }>
        <TabList>
        {
          Object.keys(data).map(key => (
            <Tab key={ `${ key }-tab` }>
              { key }
            </Tab>
          ))
        }
        </TabList>
        {
          Object.keys(data).map((key, i) => (
            <TabPanel
              key={ `${ key }-json` }
              value={ i }
            >
              <JsonView
                data={ data[keys[i]].data }
                style={{
                  ...(preferences.colorMode.current === 'dark' ? darkStyles : defaultStyles),
                  borderRadius: '0.25rem',
                }}
              />
            </TabPanel>
          ))
        }
      </Tabs>
    </Box>
  ), [data])

  return (
    <ContentPage>
      {
        user ? (
          <Fragment>
            <RawData />
          </Fragment>
        ) : (
          <Typography>Welcome! Please log in.</Typography>
        )
      }
    </ContentPage>
  )
}