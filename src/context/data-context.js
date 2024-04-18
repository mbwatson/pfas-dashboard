/*
  this context provider is responsible for application data.
  it fetches, massages, assembles, and--of course--provides data,
  namely to the map.

  we do import map layer components here from '@components/map',
  which feels like a circular dependency, but it's only to ensure
  our layer ids in the object housing the data align with the layer ids.
*/
import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

//

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

const apiRoot = `http://pfas-db-dev.renci.unc.edu/drf/api`

export const DataWrangler = ({ children }) => {
  const dustSamplesQuery = useQuery({
    queryKey: ['dust-samples'],
    queryFn: async () => {
      console.log(`fetching dust samples from ${ apiRoot }...`)
      return axios.get(apiRoot)
        .then(response => {
          if (!response.data) {
            throw new Error('no data in response')
          }
          return response.data
        })
        .catch(error => {
          console.error(error.message)
        })
    },
  })

  return (
    <DataContext.Provider value={{
      dustSamples: dustSamplesQuery,
    }}>
      { children }
    </DataContext.Provider>
  )
}

DataWrangler.propTypes = {
  children: PropTypes.node,
}

//
// we want tanstack's queryClient available within our data context, but we
// don't want layers upon layers of contexts wrapping our <App /> in index.js.
// thus we export this wrapper that provides said functionality to our
// actual machinery in `DataWrangler`, and we set up tanstack-query here.

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
  return (
    <PersistQueryClientProvider
      client={ queryClient }
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: true,
        }
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