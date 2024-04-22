import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  AspectRatio, CircularProgress, ListItemDecorator, Sheet,
  Skeleton, Tab, TabPanel, TabList, Tabs, Typography,
} from '@mui/joy'
import { collapseAllNested, darkStyles, defaultStyles, JsonView } from 'react-json-view-lite'
import { useAppContext } from '@context'

const LoadingTabPanel = () => {
  return (
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

const DataTabPanel = ({ data }) => {
  const { preferences } = useAppContext()

  const style = useMemo(() => preferences.colorMode.current === 'dark'
    ? darkStyles : defaultStyles, [preferences.colorMode.current])

  return (
    <Fragment>
      <Typography>{ data.length } samples</Typography>
      <JsonView
        data={ data }
        shouldExpandNode={ collapseAllNested }
        style={ style }
      />
    </Fragment>
  )
}

DataTabPanel.propTypes = {
  data: PropTypes.object,
}

export const DataBrowser = () => {
  const { data = [] } = useAppContext()
  const keys = Object.keys(data)

  return (
    <Sheet>
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
              { data[key].isError && <Typography>An error occurred while fetching data.</Typography> }
              { data[key].isPending && <LoadingTabPanel /> }
              { data[key]?.data && <DataTabPanel data={ data[keys[i]].data } /> }
            </TabPanel>
          ))
        }
      </Tabs>
    </Sheet>
  )
}
