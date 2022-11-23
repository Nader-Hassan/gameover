import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'

export default function Layout({userData , userlogOut}) {
  return <>
  <Navbar userData={userData} userlogOut = {userlogOut}/>
  <Outlet></Outlet>
  </>
    
  
}
