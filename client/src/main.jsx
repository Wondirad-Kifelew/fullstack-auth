import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './Auth/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  theme="light"
/>
<AppContextProvider>
    <App />
</AppContextProvider>
  </BrowserRouter>
)
