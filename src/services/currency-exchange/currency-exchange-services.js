import { VITE_BASE_API_URL } from '@/lib/utils/env-variables'

export const getCurrencies = ({ signal }) => {
  return fetch(`${VITE_BASE_API_URL}/currencies`, {
    signal,
  })
}
