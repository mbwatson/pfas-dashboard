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

const createGeoJsonQuerier = endpoint => async () => {
  console.info(`fetching data from ${ apiRoot }/${ endpoint }...`)

  const getFirstPage = async () => {
    const { data } = await axios.get(`${ apiRoot }/${ endpoint }?page=1`)
    if (!data) {
      return
    }
    return data
  }

  // first, let's get the first page and how many pages there are in total.
  const { count } = await getFirstPage()

  if (!count) {
    return []
  }

  // if we're here, we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const per_page = 10 // django rest framework default
  const promises = [...Array(Math.ceil(count / per_page)).keys()]
    .map(p => axios(`${ apiRoot }/${ endpoint }?page=${ p + 1 }`))

  // return all features in one geojson feature collection.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data)
      .reduce((geojson, d) => {
        geojson.features.push(...d.features)
        return geojson
      }, { type: 'FeatureCollection', features: [] })
    )
    .catch(error => {
      console.error(error.message)
      return []
    })
}

//

// we want tanstack's queryClient available within our data context,
// so we create a wrapper that provides tanstack query functionality.

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataWrangler = ({ children }) => {
  const dustSamplesQuery = useQuery({
    queryKey: ['ahhs_dust_data'],
    queryFn: createSampleQuerier('ahhs_dust_data'),
  })
  const waterSamplesQuery = useQuery({
    queryKey: ['ahhs_water_data'],
    queryFn: createSampleQuerier('ahhs_water_data'),
  })
  const serumSamplesQuery = useQuery({
    queryKey: ['ncserum'],
    queryFn: createSampleQuerier('ncserum'),
  })
  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: createSampleQuerier('pfas_sample_data'),
  })
  const tapwaterSamplesQuery = useQuery({
    queryKey: ['pfas_in_tapwater_usgs'],
    queryFn: createGeoJsonQuerier('pfas_in_tapwater_usgs'),
  })

  return (
    <DataContext.Provider value={{
      dust: dustSamplesQuery,
      water: waterSamplesQuery,
      serum: serumSamplesQuery,
      pfasData: pfasDataQuery,
      tapwater: tapwaterSamplesQuery,
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
