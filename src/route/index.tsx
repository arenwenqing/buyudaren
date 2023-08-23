import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '@pages/Login'
import My from '@pages/My'
import Register from '@pages/Register'
import ForgetPassword from '@pages/ForgetPassword'
// import DoubiExtract from '@pages/DoubiExtract'
// import History from '@pages/History'
// import ExtensionLogin from '@pages/ExtensionSystem/Login'
// import ExtensionHome from '@pages/ExtensionSystem/Home'
// import ExtensionRecruit from '@pages/ExtensionSystem/Recruit'
// import SociatySmallProxy from '@pages/ExtensionSystem/SociatySmallProxy'
// import BigProxy from '@pages/ExtensionSystem/BigProxy'

const ComponentAppRoute = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to='/home' />},
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/my', element: <My /> },
    { path: '/register', element: <Register /> },
    { path: '/forget', element: <ForgetPassword /> }
    // { path: '/extract', element: <DoubiExtract /> },
    // { path: '/history', element: <History /> },
    // { path: '/extension-login', element: <ExtensionLogin /> },
    // { path: '/extension-home', element: <ExtensionHome /> },
    // { path: '/extension-recruit', element: <ExtensionRecruit /> },
    // { path: '/extension-sociaty', element: <SociatySmallProxy /> },
    // { path: '/extension-wild', element: <BigProxy /> }
  ])
  return routes
}

export default ComponentAppRoute