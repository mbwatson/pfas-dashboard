import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { chemicalFormulaLaTeX } from '@util'

const API_URL = `${ process.env.API_HOST }/podm/api`

// this hook is responsible for fetching & refreshing api tokens
export const useToken = () => {
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

export const fetchSampleData = accessToken => async () => {
  console.info(`fetching data from ${ API_URL }/pfas_sample_data...`)

  if (!accessToken) {
    console.error('missing access token')
    return []
  }

  const getFirstPage = async () => {
    try {
      const { data } = await axios.get(
        `${ API_URL }/pfas_sample_data?page=1&psize=1`,
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
      `${ API_URL }/pfas_sample_data?page=${ p + 1 }&psize=${ PER_PAGE }`,
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

export const fetchAnalytes = accessToken => async () => await axios.get(
    `${ API_URL }/pfas_name_classification_info/?`
      + `fields=abbreviation,chemical_name,dtxsid,formula`
      + `&abbreviation__istartswith=PF`
      + `&psize=100`
      + `&format=json`,
    {
      timeout: 1000 * 5, // 5 seconds
      headers: {
        Authorization: `Bearer ${ accessToken }`,
        'Content-Type': 'application/json',
      },
    }
  ).then(response => response.data.results
    .map(analyte => ({
      ...analyte,
      id: analyte.abbreviation.toLowerCase(),
      formula_latex: String(chemicalFormulaLaTeX(analyte.formula)),
    }))
  ).catch(error => {
    console.error(error.message)
    return []
  })