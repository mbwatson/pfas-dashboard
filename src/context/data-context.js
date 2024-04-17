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

import { useAppContext } from '@context'

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ children }) => {
  const samplesQuery = useQuery({
    queryKey: ['get-samples'],
    queryFn: () => {
      console.info('fetching samples...')
      return []
    },
  })

  const data = {
    samples: samplesQuery,
  }

  return (
    <DataContext.Provider value={ data }>
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
    staleTime: Infinity,
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