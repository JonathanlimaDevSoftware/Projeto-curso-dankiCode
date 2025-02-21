import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/reset/reset.css'
import './assets/css/reset/base.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
