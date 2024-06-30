// import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home, { Loader as homeLoader } from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Movies, { Loader as moviesLoader } from "./pages/Movies";
import Bookmark, { Loader as bookmarkedLoader } from "./pages/Bookmark";
import Series, { Loader as seriesLoader } from "./pages/Series";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "movies", element: <Movies />, loader: moviesLoader },
      { path: "series", element: <Series />, loader: seriesLoader },
      { path: "bookmark", element: <Bookmark />, loader: bookmarkedLoader },
    ],
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
