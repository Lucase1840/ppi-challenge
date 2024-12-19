import useFetch from '@hooks/use-fetch'

import { currencySelectOptionsAdapter } from '@/lib/utils/utils'
import { getCurrencies } from '@/services/currency-exchange/currency-exchange-services'

function useCurrencies() {
  const { data, error } = useFetch({
    initialValue: [],
    fetchFunction: (signal) => getCurrencies({ signal }),
  })

  return {
    options: currencySelectOptionsAdapter(data),
    optionsErrors: error,
  }
}

export default useCurrencies
