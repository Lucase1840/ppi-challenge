export const currencySelectOptionsAdapter = (data) => {
  let defaultToValue = null
  let defaultFromValue = null

  const options = Object.entries(data).reduce((acc, [key, value]) => {
    const option = {
      symbol: value.symbol,
      value: key,
      label: value.name,
    }

    if (key === 'USD') defaultFromValue = option
    if (key === 'EUR') defaultToValue = option

    acc.push(option)

    return acc
  }, [])

  return {
    options,
    defaultFromValue,
    defaultToValue,
  }
}

export function debounce(cb, delay = 1000) {
  let timeout

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => cb(...args), delay)
  }
}

export const exchangeCalculator = (amount, exchangeRate) => {
  return (amount * exchangeRate).toFixed(6)
}

export const formatCurrencyExchangeData = (exchangeValues, { rates, date }) => {
  try {
    // *We check if the currencies to convert are different
    const differentCurrency = exchangeValues.to.value !== exchangeValues.from.value

    // * If they are the same, the conversionRates will be the same as the entered amount.
    const conversionRate = differentCurrency
      ? rates[exchangeValues.to.value].toFixed(6)
      : exchangeValues.amount

    // * We calculate te invertedCurrencyRatio
    const invertedConversionRate = differentCurrency
      ? (1 / rates[exchangeValues.to.value]).toFixed(6)
      : exchangeValues.amount

    return {
      date,
      amount: exchangeValues.amount,
      toLabel: exchangeValues.to.label,
      fromLabel: exchangeValues.from.label,
      toCurrency: exchangeValues.to.value,
      fromCurrency: exchangeValues.from.value,
      from: exchangeValues.from.value,
      exchangeResult: exchangeCalculator(exchangeValues.amount, conversionRate),
      fromCurrencyRate: conversionRate,
      toCurrencyRate: invertedConversionRate,
    }
  } catch (error) {
    throw new Error(
      'The selected currency is unavailable for this exchange request. Please try another one.',
    )
  }
}

export const getErrorMessageByStatusCode = (status) => {
  switch (status) {
    case 400:
      return 'Invalid input. Please check your data and try again.'
    case 404:
      return 'Requested resource not found. Please check and try again.'
    default:
      return 'An error occurred. Please try again.'
  }
}
