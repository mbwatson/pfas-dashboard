import { Fragment, useCallback } from 'react'
import {
  AspectRatio, Box, CircularProgress, ListItemDecorator, Skeleton,
  Tab, TabPanel, TabList, Tabs, Typography,
} from '@mui/joy'
import { ContentPage } from '@components/layout'
import { useAppContext, useAuth } from '@context'
import { collapseAllNested, darkStyles, defaultStyles, JsonView } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

export const HomeView = () => {
  const { data, preferences } = useAppContext()
  const keys = Object.keys(data)

  console.log(data)

  const { user } = useAuth()

  const RawData = useCallback(({data}) => (
    <Box>
      <Tabs defaultValue={ 0 }>
        <TabList>
        {
          Object.keys(data).map(key => (
            <Tab key={ `${ key }-tab` }>
              {
                data[key].isLoading && (
                  <ListItemDecorator>
                    <CircularProgress size="sm" />
                  </ListItemDecorator>
                )
              }
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
              {
                data[keys[i]]?.data ? (
                  <Fragment>
                    <Typography>
                      { data[keys[i]]?.data?.length } samples
                    </Typography>
                    <JsonView
                      data={ data[keys[i]].data }
                      shouldExpandNode={ collapseAllNested }
                      style={{
                        ...(preferences.colorMode.current === 'dark' ? darkStyles : defaultStyles),
                        borderRadius: '0.25rem',
                      }}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography>
                      <Skeleton>samples samples</Skeleton>
                    </Typography>
                    <AspectRatio ratio="21/9">
                      <Skeleton />
                    </AspectRatio>
                  </Fragment>
                )
              }
            </TabPanel>
          ))
        }
      </Tabs>
    </Box>
  ), [preferences.colorMode.current])

  return (
    <ContentPage>
      {
        user ? (
          <Fragment>
            <RawData data={ data }/>
          </Fragment>
        ) : (
          <Typography>Welcome! Please log in.</Typography>
        )
      }
    </ContentPage>
  )
}