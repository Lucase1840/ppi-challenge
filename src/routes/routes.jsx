import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/main-layout'
import CurrencyExchangePage from '@/pages/currency-exchange/currency-exchange-page'

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <p>error</p>,
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
