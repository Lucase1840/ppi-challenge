import { useContext } from 'react'

import { CurrencyExchangeContext } from '@/context/currency-exchange-context'

function useCurrencyExchange() {
  const context = useContext(CurrencyExchangeContext)

  if (!context) {
    throw new Error('useCurrencyExchange must be used within CurrencyExchangeProvider')
  }

  const {
    amount,
    currencyExchangeResult,
    date,
    differentCurrency,
    fromCurrency,
    fromLabel,
    toCurrency,
    toLabel,
    invertedCurrencyExchangeResult,
  } = context.exchangeResult

  return {
    amount,
    currencyExchangeResult,
    date,
    differentCurrency,
    fromCurrency,
    fromLabel,
    toCurrency,
    toLabel,
    invertedCurrencyExchangeResult,
    setExchangeResult: context.setExchangeResult,
  }
}

export default useCurrencyExchange
