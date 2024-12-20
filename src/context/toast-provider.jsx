import { createContext, useMemo } from 'react'

import { toast, ToastContainer } from 'react-toastify'

export const ToastContext = createContext()

function ToastProvider({ children }) {
  const setError = (error) => {
    toast(error.message ? error.message : 'Sorry! An unexpected error has occurred.', {
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

  const value = useMemo(() => ({ setError }), [])

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
