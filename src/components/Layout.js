import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({children}) => {
  return (
    <div>

        <Navbar/>

        <main>
         {children}
        </main>

    </div>
   
  )
}
