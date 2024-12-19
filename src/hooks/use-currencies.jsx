import { useEffect } from 'react'

import useFetch from '@hooks/use-fetch'
import { toast } from 'react-toastify'

import { currencySelectOptionsAdapter } from '@/lib/utils/utils'
import { getCurrencies } from '@/services/currency-exchange/currency-exchange-services'

function useCurrencies() {
  const { data, error } = useFetch({
    initialValue: [],
    fetchFunction: (signal) => getCurrencies({ signal }),
  })

  useEffect(() => {
    if (error) {
      // TODO :  Refactor this inside a errorHandleHook.
      toast('Ha ocurrido un error inesperado! Por favor, intente nuevamente', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error',
      })
    }
  }, [error])

  return {
    options: currencySelectOptionsAdapter(data) ?? [],
  }
}

export default useCurrencies
