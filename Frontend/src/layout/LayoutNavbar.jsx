import React from 'react'
import { Header } from '../components'
import { Outlet } from 'react-router-dom'

export const LayoutNavbar = () => {
  return (
    <main>
      <Header />
      <Outlet />
   </main>
  )
}
