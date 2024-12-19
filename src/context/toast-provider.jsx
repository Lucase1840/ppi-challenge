import { createContext } from 'react'

import { ToastContainer } from 'react-toastify'

export const ToastContext = createContext()

function ToastProvider({ children }) {
  return (
    <ToastContext.Provider>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
