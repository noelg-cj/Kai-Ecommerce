import { useState } from 'react'
import Landing from "./routes/landing"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shop from './routes/shop'

const Container = () => {
  return (
    <div className='bg-[#E6E6FA] font-Satoshi'>
      <p>Hello</p>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { 
        path: "/", 
        element: <Landing />,
      },
      {
        path: "/shop",
        element: <Shop />,
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
