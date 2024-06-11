/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data.
*/
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import {
  CircularProgress,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import {
  ErrorOutline as ErrorIcon
} from '@mui/icons-material'
import axios from 'axios'

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

import { usePreferences } from '@context'
import { analytes } from '@data'

import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { podmColumns } from '@components/table'

//

const API_URL = `${ process.env.API_HOST }/podm/api`
const CACHE_KEY = 'PFAS_DATA_CACHE'

const CONNECTION_STATE_ICONS = {
  busy: <CircularProgress size="sm" />,
  error: <ErrorIcon color="error" />
}

const ConnectionStatus = ({
  message = '',
  status = 'busy',
}) => {
  return (
    <Sheet
      component={ Stack }
      variant="solid"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        '.MuiTypography-root': {
          p: 2,
        },
      }}
    >
      <Typography
        level="body-xl"
        variant="soft"
        startDecorator={ CONNECTION_STATE_ICONS[status] }
      >{ message }</Typography>
    </Sheet>
  )
}

ConnectionStatus.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(CONNECTION_STATE_ICONS)),
}

// this hook is responsible for fetching & refreshing api tokens
const useToken = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [error, setError] = useState(null)

  const fetchToken = useCallback(async () => {
    try {
      const response = await axios.post(
        // the trailing slash is necessary here,
        // as it matches urls.py in the backend.
        `${ API_URL }/token/`,
        {
          username: process.env.API_USERNAME,
          password: process.env.API_PASSWORD,
        },
      )
      if (response.status !== 200) {
        throw new Error('invalid response')
      }
      const { access, refresh } = await response.data
      if (!access || !refresh) {
        throw new Error('could not locate tokens')
      }
      setAccessToken(access)
    } catch (error) {
      console.error(error.message)
      setError('An error occurred.')
      return
    }
  }, [])

  useEffect(() => {
    fetchToken()
  }, [])

  return { accessToken, error, fetchToken }
}

// we want tanstack's queryClient available within our data context,
// so we create a wrapper that provides tanstack query functionality.

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

const createMultiQuerier = (endpoint, accessToken) => async () => {
  console.info(`fetching data from ${ API_URL }/${ endpoint }...`)

  if (!accessToken) {
    console.log('no access token')
    return []
  }

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(
        `${ API_URL }/${ endpoint }?page=1&psize=1`,
        {
          timeout: 1000 * 5, // 5 seconds
          headers: {
            Authorization: `Bearer ${ accessToken }`,
            'Content-Type': 'application/json',
          },
        }
      )
      return data
    } catch (error) {
      console.error(error.message)
      return null
    }
  }

  // first, let's get the first page and check the total number of pages.
  const data = await getFirstPage()

  if (!data.count) {
    return []
  }

  // if we're here, we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const PER_PAGE = 100
  const promises = [...Array(Math.ceil(data.count / PER_PAGE)).keys()]
    .map(p => axios(
      `${ API_URL }/${ endpoint }?page=${ p + 1 }&psize=${ PER_PAGE }`,
      {
        timeout: 1000 * 5, // 5 seconds
        headers: {
          Authorization: `Bearer ${ accessToken }`,
          'Content-Type': 'application/json',
        },
      }
    ))

  // return all results in one array.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data.results)
      .reduce((allData, d) => {
        allData.push(...d)
        return allData
      }, [])
    )
    .catch(error => {
      console.error(error)
      return []
    })
}

export const DataWrangler = ({ accessToken, children }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: createMultiQuerier('pfas_sample_data', accessToken),
  })

  const chemicalIds = useMemo(() => analytes.map(s => s.id).sort(), [])

  const table = useReactTable({
    data: pfasDataQuery.data,
    columns: podmColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      pagination,
      sorting,
    },
  })

  const filterCount = table.getAllLeafColumns().filter(col => col.getIsFiltered()).length

  return (
    <DataContext.Provider value={{
      pfasData: pfasDataQuery,
      analytes,
      chemicalIds,
      podmTable: {
        table,
        columnFilters, setColumnFilters,
        sorting, setSorting,
      },
      filterCount,
    }}>
      {
        pfasDataQuery.isPending || pfasDataQuery.isLoading
          ? <ConnectionStatus message="Fetching data" />
          : children
        }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
  accessToken: PropTypes.string,
}

// Tanstack Query machinery
const persister = createSyncStoragePersister({
  key: CACHE_KEY,
  storage: window.localStorage,
  // we're potentially dealing with a significant
  // amount of data, and local storage isn't huge,
  // so we want to pack it down as much as we can.
  serialize: data => compress(JSON.stringify(data)),
  deserialize: data => JSON.parse(decompress(data)),
})

const queryClient = new QueryClient({
  defaultOptions: { queries: {
    staleTime: 1000 * 60 * 60 * 24, // 1 day,
  }, },
})

export const DataProvider = ({ children }) => {
  const preferences = usePreferences()

  const { accessToken, error } = useToken()

  if (!accessToken && !error) {
    return (
      <ConnectionStatus
        message="Establishing connection to API"
      />
    )
  }

  if (!accessToken && error) {
    return (
      <ConnectionStatus
        message={ error }
        status="error"
      />
    )
  }

  return (
    <PersistQueryClientProvider
      client={ queryClient }
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: () => preferences.cache.enabled,
        },
      }}
    >
      <DataWrangler accessToken={ accessToken }>
        { children }
      </DataWrangler>
    </PersistQueryClientProvider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
