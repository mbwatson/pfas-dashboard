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

import { QueryClient, useQuery } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { compress, decompress } from 'lz-string'

//

const apiRoot = process.env.NODE_ENV === 'production'
  ? `https://pfas-db-dev.mdc.renci.unc.edu/podm/api`
  : `http://localhost:8000/podm/api`


const createSampleQuerier = endpoint => async () => {
  console.info(`fetching data from ${ apiRoot }/${ endpoint }...`)

  const getFirstPage = async () => {
    const { data } = await axios.get(`${ apiRoot }/${ endpoint }?page=1`, {
      timeout: 5000,
    })
    if (!data) {
      return
    }
    return data
  }

  // first, let's get the first page and how many pages there are in total.
  const data = await getFirstPage()

  if (!data.count) {
    return []
  }

  // if we're here, we have a non-zero number of pages,
  // so we make the neccssary number of requests.
  const promises = [...Array(Math.ceil(data.count / 10)).keys()]
    .map(p => axios(`${ apiRoot }/${ endpoint }?page=${ p + 1 }`))

  // return all features stitched together.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data.results))
    .then(data => data.reduce((allData, d) => {
      allData.push(...d)
      return allData
    }, []))
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
  const promises = [...Array(Math.ceil(count / 10)).keys()]
    .map(p => axios(`${ apiRoot }/${ endpoint }?page=${ p + 1 }`))

  // return all features stitched together.
  return Promise.all(promises)
    .then(responses => responses.map(r => r.data))
    .then(data => data.reduce((geojson, d) => {
        geojson.features.push(...d.features)
        return geojson
      }, { type: 'FeatureCollection', features: [] }))
    .catch(error => {
      console.error(error.message)
      return []
    })
}

//

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
  const tapwaterSamplesQuery = useQuery({
    queryKey: ['pfas_in_tapwater_usgs'],
    queryFn: createGeoJsonQuerier('pfas_in_tapwater_usgs'),
  })
  const pfasDataQuery = useQuery({
    queryKey: ['pfas_sample_data'],
    queryFn: createSampleQuerier('pfas_sample_data'),
  })

  return (
    <DataContext.Provider value={{
      dust: dustSamplesQuery,
      water: waterSamplesQuery,
      serum: serumSamplesQuery,
      tapwater: tapwaterSamplesQuery,
      pfasData: pfasDataQuery,
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