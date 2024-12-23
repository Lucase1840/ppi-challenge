import { useCallback, useEffect, useState } from 'react'

import useCurrencyExchange from '@hooks/use-currency-exchange'
import useFetch from '@hooks/use-fetch'
import useLoading from '@hooks/use-loading'
import useToast from '@hooks/use-toast'

import { debounce, formatCurrencyExchangeData, validateForm } from '@/lib/utils/utils'
import { getExchange } from '@/services/currency-exchange/currency-exchange-services'

const initialFormValues = {
  amount: '1.00',
  from: null,
  to: null,
}

function useCurrencyExchangeForm(defaultFromValue, defaultToValue) {
  const setLoading = useLoading()
  const { setError: setErrorToast } = useToast()
  const { fetchData } = useFetch()
  const { setExchangeResult } = useCurrencyExchange()

  const [values, setValues] = useState(initialFormValues)

  const [errors, setErrors] = useState({})

  const [shouldDebounce, setShouldDebounce] = useState(false)

  const submitForm = async (currentValues, errors) => {
    setLoading(true)

    if (!currentValues.from) return

    if (Object.values(errors)?.length) {
      setLoading(false)

      return
    }

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
  const debouncedSubmit = useCallback(debounce(submitForm, 350), [])

  useEffect(() => {
    if (shouldDebounce) {
      debouncedSubmit(values, errors)
    }
  }, [shouldDebounce, values, debouncedSubmit, errors])

  useEffect(() => {
    if (!shouldDebounce && !Object.values(errors).length) {
      submitForm(values, errors)
    }
  }, [shouldDebounce, values, errors])

  useEffect(() => {
    // * We make the initial fetch with the default values
    if (defaultFromValue && defaultToValue) {
      const newValues = {
        amount: '1.00',
        from: defaultFromValue,
        to: defaultToValue,
      }

      setValues(newValues)
      submitForm(newValues, errors)
    }
  }, [defaultFromValue, defaultToValue])

  const onInputChange = useCallback((event) => {
    const { name, value } = event.target
    const errorMessage = validateForm(name, value, setErrors)

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
  }
}

export default useCurrencyExchangeForm
