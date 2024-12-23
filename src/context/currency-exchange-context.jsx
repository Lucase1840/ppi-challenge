import { createContext, useMemo, useState } from 'react'

const initialValues = {
  amount: '1.00',
  currencyExchangeResult: '0.00',
  date: '-',
  differentCurrency: '0.00',
  fromCurrency: 'USD',
  fromLabel: 'US Dollar',
  toCurrency: 'EUR',
  toLabel: 'Euro',
  invertedCurrencyExchangeResult: '0.00',
}

export const CurrencyExchangeContext = createContext(initialValues)

function CurrencyExchangeProvider({ children }) {
  const [exchangeResult, setExchangeResult] = useState(initialValues)

  const value = useMemo(
    () => ({
      exchangeResult,
      setExchangeResult,
    }),
    [exchangeResult, setExchangeResult],
  )

  return (
    <CurrencyExchangeContext.Provider value={value}>{children}</CurrencyExchangeContext.Provider>
  )
}

export default CurrencyExchangeProvider
