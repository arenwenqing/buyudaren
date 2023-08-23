import React from 'react'
import ReactDOM from 'react-dom'
// import ComponentAppRoute from './route'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '../requestIntercept'
// import 'antd-mobile/es/global'
import App from './app'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)