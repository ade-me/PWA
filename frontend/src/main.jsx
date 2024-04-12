import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./redux/app-store.js"
import {Toaster} from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position="top-right" toastOptions={{ duration: 8000 }}/>
      <App />
    </Provider>
  </React.StrictMode>,
)
