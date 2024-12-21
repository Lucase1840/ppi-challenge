import LoadingProvider from '@context/loading-context'
import Routes from '@routes/routes.jsx'

import CurrencyExchangeProvider from './context/currency-exchange-context'
import ToastProvider from './context/toast-provider'

export default function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <CurrencyExchangeProvider>
          <Routes />
        </CurrencyExchangeProvider>
      </ToastProvider>
    </LoadingProvider>
  )
}
