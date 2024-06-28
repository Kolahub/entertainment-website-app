// import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home, { Loader as homeLoader } from "./pages/Home"
import RootLayout from "./pages/RootLayout"
import Error from "./pages/Error"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error/>,
    children: [
      {index: true, element: <Home />, loader: homeLoader},
      { path: '/signup', element: <SignUp /> },
      { path: '/signin', element: <SignIn /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App