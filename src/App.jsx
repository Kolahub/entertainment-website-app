// import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Movies from "./pages/Movies";
import Bookmark from "./pages/Bookmark";
import Series from "./pages/Series";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies />},
      { path: "series", element: <Series /> },
      { path: "bookmark", element: <Bookmark /> },
    ],
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
