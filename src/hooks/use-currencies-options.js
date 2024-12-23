import { useEffect, useState } from 'react'

import { currencySelectOptionsAdapter } from '@/lib/utils/utils'
import { getCurrencies } from '@/services/currency-exchange/currency-exchange-services'

import useFetch from './use-fetch'
import useLoading from './use-loading'

function useCurrenciesOptions() {
  const setLoading = useLoading()
  const { fetchData } = useFetch()

  const [currencies, setCurrencies] = useState({})

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true)
      const data = await fetchData(getCurrencies)

      setCurrencies(currencySelectOptionsAdapter(data))
      setLoading(false)
    }

    fetchCurrencies()
  }, [setLoading, fetchData])

  return currencies
}

export default useCurrenciesOptions
