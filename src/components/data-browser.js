import { Fragment } from 'react'
import {
  AspectRatio, Box, CircularProgress, ListItemDecorator, Skeleton,
  Tab, TabPanel, TabList, Tabs, Typography,
} from '@mui/joy'
import { collapseAllNested, darkStyles, defaultStyles, JsonView } from 'react-json-view-lite'
import { useAppContext } from '@context'

export const DataBrowser = () => {
  const { data = [], preferences } = useAppContext()
  const keys = Object.keys(data)

  return (
    <Box>
      <Tabs defaultValue={ 0 }>
        <TabList>
          {
            Object.keys(data).map(key => (
              <Tab key={ `${ key }-tab` }>
                {
                  data[key].isLoading && (
                    <ListItemDecorator>
                      <CircularProgress
                        size="sm"
                        sx={{ transform: 'scale(0.66)' }}
                      />
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
            <TabPanel key={ `${ key }-json` } value={ i }>
              {
                data[key]?.data && !data[key].isPending ? (
                  <Fragment>
                    <Typography>
                      { data[keys[i]]?.data?.length } samples
                    </Typography>
                    <JsonView
                      data={ data[keys[i]].data }
                      shouldExpandNode={ collapseAllNested }
                      style={{
                        ...(preferences.colorMode.current === 'dark'
                            ? darkStyles : defaultStyles),
                        borderRadius: '0.25rem',
                      }}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography>
                      <Skeleton>#### samples</Skeleton>
                    </Typography>
                    <AspectRatio ratio="3/2">
                      <Skeleton />
                    </AspectRatio>
                  </Fragment>
                )
              }
              {
                !data[key].data && !data[key].isPending && (
                  <Typography>Could not fetch data.</Typography>
                )
              }
            </TabPanel>
          ))
        }
      </Tabs>
    </Box>
  )
}