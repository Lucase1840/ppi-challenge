import { useCallback, useEffect, useState } from 'react'

import useFetch from '@hooks/use-fetch'
import useLoading from '@hooks/use-loading'

import { debounce, formatCurrencyExchangeData } from '@/lib/utils/utils'
import { getExchange } from '@/services/currency-exchange/currency-exchange-services'

import useToast from './use-toast'

const initialFormValues = {
  amount: '1.00',
  from: null,
  to: null,
}

function useCurrencyExchangeForm(defaultFromValue, defaultToValue) {
  const setLoading = useLoading()
  const { fetchData } = useFetch()

  const [values, setValues] = useState(initialFormValues)

  const [errors, setErrors] = useState({})
  const [exchangeResult, setExchangeResult] = useState({})

  const [shouldDebounce, setShouldDebounce] = useState(false)

  const { setError: setErrorToast } = useToast()

  const submit = async (currentValues) => {
    setLoading(true)
    if (!currentValues.from) return
    const data = await fetchData(() => getExchange(currentValues.from.value))

    try {
      if (data) {
        setExchangeResult(formatCurrencyExchangeData(currentValues, data))
      }
    } catch (error) {
      setErrorToast(error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(submit, 500), [])

  useEffect(() => {
    if (shouldDebounce && !Object.values(errors).length) {
      debouncedSubmit(values)
    }
    // TODO: Ver si puedo mandar signal para cancelar fetch aca
  }, [shouldDebounce, values, debouncedSubmit, errors])

  useEffect(() => {
    if (!shouldDebounce && !Object.values(errors).length) {
      submit(values)
    }
  }, [shouldDebounce, values, errors])

  useEffect(() => {
    if (defaultFromValue && defaultToValue) {
      const newValues = {
        amount: '1.00',
        from: defaultFromValue,
        to: defaultToValue,
      }

      setValues(newValues)
      submit(newValues)
    }
  }, [defaultFromValue, defaultToValue])

  const setError = (name, errorMessage) => {
    setErrors((prevState) => ({
      ...prevState,
      [name]: errorMessage,
    }))
  }

  const onInputChange = useCallback((event) => {
    const { name, value } = event.target
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

      errorMessage && setError(name, errorMessage)
    } else if (!value) {
      errorMessage = 'Please, enter a valid amount'
      setError(name, errorMessage)
    }

    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (!errorMessage) {
      setShouldDebounce(true)
      setErrors({})
    }
  }, [])

  const onSelectChange = useCallback((value, name) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setShouldDebounce(false)
  }, [])

  const switchConversionValues = useCallback(() => {
    setValues((prevState) => ({
      amount: prevState.amount,
      to: prevState.from,
      from: prevState.to,
    }))
    setShouldDebounce(false)
  }, [])

  return {
    onSelectChange,
    onInputChange,
    errors,
    values,
    switchConversionValues,
    exchangeResult,
  }
}

export default useCurrencyExchangeForm
