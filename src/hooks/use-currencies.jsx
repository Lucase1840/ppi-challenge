import { useContext } from 'react'

import { CurrenciesContext } from '@/context/currencies-context'

function useCurrencies() {
  const context = useContext(CurrenciesContext)

  if (!context) {
    throw new Error('useCurrencies must be used within CurrenciesProvider')
  }

  const { options, defaultFromValue, defaultToValue } = context

  return {
    options,
    defaultFromValue,
    defaultToValue,
  }
}

export default useCurrencies
