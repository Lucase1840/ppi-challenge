import LoadingProvider from '@context/loading-context'
import Routes from '@routes/routes.jsx'

import ToastProvider from './context/toast-provider'

export default function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </LoadingProvider>
  )
}
