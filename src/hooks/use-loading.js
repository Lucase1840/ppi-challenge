import { useContext } from 'react'

import { LoadingContext } from '@/context/loading-context'

function useLoading() {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }

  return context.setLoading
}

export default useLoading
