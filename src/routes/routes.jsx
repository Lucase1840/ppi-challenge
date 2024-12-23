import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/main-layout'
import CurrencyExchangePage from '@/pages/currency-exchange/currency-exchange-page'
import Error404 from '@/pages/error/error-fallback'

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Error404 />,
      children: [
        {
          path: '',
          element: <CurrencyExchangePage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
