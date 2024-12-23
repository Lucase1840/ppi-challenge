import { useContext } from 'react'

import { ToastContext } from '@/context/toast-provider'

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return {
    setError: context.setError,
  }
}

export default useToast
