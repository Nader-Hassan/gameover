import React, { useState } from 'react';
import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Register from './components/Register/Register';
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react';
import Allgames from './components/Allgames/Allgames';
import Platform from './components/Platforms/Platform';
import Sortby from './components/Sortby/Sortby';
import Gamedetails from './components/Gamedetails/Gamedetails';
import Categories from './components/Categories/Categories';
export default function App() {
  const [userData, setuserData] = useState(null);
  useEffect(() => {
  
  if(localStorage.getItem('usertoken')!== null)
  saveUserData();
  }, [])
  function logOut(){
    localStorage.removeItem('usertoken');
    setuserData(null);
    return <Navigate to={'/login'}/>
  }
  function saveUserData(){
    let encodedToken = localStorage.getItem('usertoken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }
  function ProtectedRoute({children})
  {
    if(userData === null)
    {
      return <Login saveUserData={saveUserData}/>
    
    }
    else
    {
      return children
    }
  
  }
  const routers = createHashRouter([
    {path:'' , element:<Layout userData={userData} userlogOut={logOut}/> ,children:[
      {path:'',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'allgames' , element:<ProtectedRoute><Allgames/></ProtectedRoute>},
      {path:'platform/:path' , element:<ProtectedRoute><Platform/></ProtectedRoute>},
      {path:'sort-by/:path' , element:<ProtectedRoute><Sortby/></ProtectedRoute>},
      {path:'cateogries/:path' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'gamedetails/:path' , element:<ProtectedRoute><Gamedetails/></ProtectedRoute>},
      {path:'login' , element:<Login saveUserData={saveUserData}/>},
      {path:'register' , element:<Register/>},
      {path:'*' , element:<ProtectedRoute><PageNotFound/></ProtectedRoute>}
    ]  }
  ])
  return <RouterProvider router={routers}/>
}

