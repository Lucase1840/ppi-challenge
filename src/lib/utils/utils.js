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
    options: options.sort((a, b) => a.label.localeCompare(b.label)),
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

const dateFormatter = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date)
}

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  }).format(number)
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
      date: dateFormatter(new Date(date)),
      amount: formatNumber(exchangeValues.amount),
      toLabel: exchangeValues.to.label,
      fromLabel: exchangeValues.from.label,
      toCurrency: exchangeValues.to.value,
      fromCurrency: exchangeValues.from.value,
      currencyExchangeResult: differentCurrency
        ? formatNumber(exchangeCalculator(exchangeValues.amount, conversionRate))
        : formatNumber(exchangeValues.amount),
      invertedCurrencyExchangeResult: differentCurrency
        ? formatNumber(exchangeCalculator(exchangeValues.amount, invertedConversionRate))
        : formatNumber(exchangeValues.amount),
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

export const validateForm = (name, value, setError) => {
  let errorMessage = ''

  if (name === 'amount' && value) {
    // * With this regex we know if its a valid number with the format 1,000.00.
    // * ',' characters are optionals
    // * It does not allow '-', so negative numbers cant be input.
    const validNumberRegex = /^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/

    if (!validNumberRegex.test(value)) {
      errorMessage = 'Please, enter a valid number with format 1,000.00'
    }

    if (!errorMessage && !parseFloat(value, 10) > 0) {
      errorMessage = 'Please, enter a number greater than 0'
    }

    errorMessage &&
      setError((prevState) => ({
        ...prevState,
        [name]: errorMessage,
      }))
  } else if (!value) {
    errorMessage = 'Please, enter a valid amount'
    setError((prevState) => ({
      ...prevState,
      [name]: errorMessage,
    }))
  }

  return errorMessage
}
