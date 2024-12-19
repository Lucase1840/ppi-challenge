import { useEffect, useState } from 'react'

import useLoading from '@hooks/use-loading'

function useFetch({ initialValue = null, fetchFunction, dependencies = [] }) {
  const [data, setData] = useState(initialValue)
  const setLoading = useLoading()
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    let isUnmounted = false
    const abortController = new AbortController()

    fetchFunction(abortController.signal)
      .then((res) => {
        if (!isUnmounted) {
          res.json().then((data) => {
            setData(data)
          })
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return
        }

        setError(err)
      })
      .finally(() => setLoading(false))

    return () => {
      isUnmounted = true
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])

  return {
    data,
    error,
  }
}

export default useFetch
