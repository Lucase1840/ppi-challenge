import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/main-layout'

function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <p>error</p>,
      children: [
        {
          path: '',
          element: <h1>My exchange page</h1>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Routes
