import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Register from './page/register/register.jsx'
import ForgotPassword from './page/forgetpassword/forgetpassword.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ForgotPassword/>
  </StrictMode>,
)
