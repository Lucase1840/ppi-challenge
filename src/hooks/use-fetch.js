import { useCallback } from 'react'

import useToast from '@hooks/use-toast'

import { getErrorMessageByStatusCode } from '@/lib/utils/utils'

function useFetch() {
  const { setError } = useToast()

  const fetchData = useCallback(
    async (fetchFunction) => {
      try {
        const response = await fetchFunction()

        if (response.status >= 500) {
          throw new Error('Sorry! An unexpected error has occurred.')
        }

        if (!response.ok) {
          const message = getErrorMessageByStatusCode(response.status)

          throw new Error(message)
        }

        const data = await response.json()

        return data
      } catch (error) {
        setError(error)
      }
    },
    [setError],
  )

  return {
    fetchData,
  }
}

export default useFetch
