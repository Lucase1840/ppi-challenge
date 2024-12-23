import { useCallback, useEffect, useMemo, useState } from 'react'

import useFetch from '@hooks/use-fetch'
import useLoading from '@hooks/use-loading'
import useToast from '@hooks/use-toast'

import { formatCurrencyExchangeData, validateForm } from '@/lib/utils/utils'
import { getExchange } from '@/services/currency-exchange/currency-exchange-services'

import useCurrencyExchange from './use-currency-exchange'
import useDebounce from './use-debounce'

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
  const debouncedAmount = useDebounce(values.amount)

  const [errors, setErrors] = useState({})

  const submitForm = useMemo(
    () => async () => {
      if (!values.from) return
      if (Object.keys(errors).length) return
      setLoading(true)

      const data = await fetchData(() => getExchange(values.from.value))

      try {
        if (data) {
          setExchangeResult(formatCurrencyExchangeData(values, data))
        }
      } catch (error) {
        setErrorToast(error)
      } finally {
        setLoading(false)
      }
    },
    [fetchData, setErrorToast, setExchangeResult, setLoading, values, errors],
  )

  useEffect(() => {
    // * If we don't verify this condition, every time input is changed, we would fetch data because of the
    // * submit form dep.
    if (debouncedAmount === values.amount) {
      submitForm()
    }
  }, [debouncedAmount, submitForm, values])

  useEffect(() => {
    // * We make the initial fetch with the default values
    if (defaultFromValue && defaultToValue) {
      setValues({
        amount: '1.00',
        from: defaultFromValue,
        to: defaultToValue,
      })
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
      setErrors({})
    }
  }, [])

  const onSelectChange = useCallback((value, name) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }, [])

  const switchConversionValues = useCallback(() => {
    setValues((prevState) => ({
      amount: prevState.amount,
      to: prevState.from,
      from: prevState.to,
    }))
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
