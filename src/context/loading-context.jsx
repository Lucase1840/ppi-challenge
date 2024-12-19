import { createContext, useMemo, useState } from 'react'

import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner'

export const LoadingContext = createContext()

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  const values = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading],
  )

  return (
    <LoadingContext.Provider value={values}>
      {loading ? <LoadingSpinner /> : null}
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
