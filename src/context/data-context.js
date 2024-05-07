/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data.
*/
import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

import { useAppContext } from '@context'

//

const apiRoot = `${ process.env.API_HOST }/podm/api`

const createSampleQuerier = endpoint => async () => {
  console.info(`fetching data from ${ apiRoot }/${ endpoint }...`)

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(`${ apiRoot }/${ endpoint }?page=1`, {
        timeout: 1000 * 60 * 60 * 24, // 1 day
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
  const per_page = 10 // django rest framework default
  const promises = [...Array(Math.ceil(data.count / per_page)).keys()]
    .map(p => axios(`${ apiRoot }/${ endpoint }?page=${ p + 1 }`))

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

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ children }) => {
  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: createSampleQuerier('pfas_sample_data'),
  })

  return (
    <DataContext.Provider value={{
      pfasData: pfasDataQuery,
    }}>
      { children }
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
    staleTime: 1000 * 5,
  }, },
})

export const DataProvider = ({ children }) => {
  const { preferences } = useAppContext()

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
