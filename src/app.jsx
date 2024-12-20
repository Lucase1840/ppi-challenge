import LoadingProvider from '@context/loading-context'
import Routes from '@routes/routes.jsx'

import CurrenciesProvider from './context/currencies-context'
import ToastProvider from './context/toast-provider'

export default function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <CurrenciesProvider>
          <Routes />
        </CurrenciesProvider>
      </ToastProvider>
    </LoadingProvider>
  )
}
