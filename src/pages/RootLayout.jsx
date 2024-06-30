// import React from 'react'

import { Outlet } from "react-router-dom"

function RootLayout() {
  return (
    <div className="bg-darkBlue">
        <Outlet />
    </div>
  )
}

export default RootLayout