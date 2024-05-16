/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data.
*/
import { createContext, useContext, useMemo } from 'react'
import { CircularProgress } from '@mui/joy'
import PropTypes from 'prop-types'
import axios from 'axios'

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

import { usePreferences } from '@context'

//

const apiRoot = `${ process.env.API_HOST }/podm/api`

const createSampleQuerier = endpoint => async () => {
  console.info(`fetching data from ${ apiRoot }/${ endpoint }...`)

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(`${ apiRoot }/${ endpoint }?page=1&psize=1`, {
        timeout: 1000 * 5 // 5 seconds
      })
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
    .map(p => axios(`${ apiRoot }/${ endpoint }?page=${ p + 1 }&psize=${ PER_PAGE }`))

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

//

// we want tanstack's queryClient available within our data context,
// so we create a wrapper that provides tanstack query functionality.

const chemicals = [
  { id: 'pfna',   name: 'pfna name' },
  { id: 'pfds',   name: 'pfds name' },
  { id: 'pfhxa',  name: 'pfhxa name' },
  { id: 'pfoa',   name: 'pfoa name' },
  { id: 'pfos',   name: 'pfos name' },
  { id: 'pfba',   name: 'pfba name' },
  { id: 'pfdoa',  name: 'pfdoa name' },
  { id: 'pfpea',  name: 'pfpea name' },
  { id: 'pfhps',  name: 'pfhps name' },
  { id: 'pfunda', name: 'pfunda name' },
  { id: 'pfbs',   name: 'pfbs name' },
  { id: 'pfpes',  name: 'pfpes name' },
  { id: 'pfns',   name: 'pfns name' },
  { id: 'pfhpa',  name: 'pfhpa name' },
  { id: 'pfhxs',  name: 'pfhxs name' },
  { id: 'pfda',   name: 'pfda name' },
  { id: 'pfuda',  name: 'pfuda name' },
]

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ children }) => {
  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: createSampleQuerier('pfas_sample_data'),
  })

  const chemicalIds = useMemo(() => chemicals.map(s => s.id), [])

  return (
    <DataContext.Provider value={{
      pfasData: pfasDataQuery,
      chemicals,
      chemicalIds,
    }}>
      { pfasDataQuery.isPending ? <CircularProgress sx={{ margin: '15rem auto' }} /> : children }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
}

// Tanstack Query machinery
const persister = createSyncStoragePersister({
  key: 'PFAS_DATA_CACHE',
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
      <DataWrangler>
        { children }
      </DataWrangler>
    </PersistQueryClientProvider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
