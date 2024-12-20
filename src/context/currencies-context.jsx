import { createContext, useEffect, useMemo, useState } from 'react'

import useLoading from '@hooks/use-loading'

import useFetch from '@/hooks/use-fetch'
import { currencySelectOptionsAdapter } from '@/lib/utils/utils'
import { getCurrencies } from '@/services/currency-exchange/currency-exchange-services'

export const CurrenciesContext = createContext()

function CurrenciesProvider({ children }) {
  const setLoading = useLoading()
  const [currencies, setCurrencies] = useState({})
  const { fetchData } = useFetch()

  useEffect(() => {
    setLoading(true)

    const fetchCurrencies = async () => {
      const data = await fetchData(getCurrencies)

      setCurrencies(data)
    }

    setLoading(false)
    fetchCurrencies()
  }, [setLoading, fetchData])

  const value = useMemo(() => currencySelectOptionsAdapter(currencies), [currencies])

  return <CurrenciesContext.Provider value={value}>{children}</CurrenciesContext.Provider>
}

export default CurrenciesProvider
