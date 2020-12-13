import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
