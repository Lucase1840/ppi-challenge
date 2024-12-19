import LoadingProvider from '@context/loading-context'
import Routes from '@routes/routes.jsx'

export default function App() {
  return (
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  )
}
