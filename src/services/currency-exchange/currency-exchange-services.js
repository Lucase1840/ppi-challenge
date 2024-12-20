import { VITE_BASE_API_URL } from '@/lib/utils/env-variables'

export const getCurrencies = () => {
  return fetch(`${VITE_BASE_API_URL}/currencies`)
}

export const getExchange = (currency) => {
  const path = '/rates'
  const params = new URLSearchParams()

  params.append('base', currency)

  const queryParams = path.concat(`?${params.toString()}`)

  const url = VITE_BASE_API_URL.concat(queryParams)

  return fetch(url)
}
