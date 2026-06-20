import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/d4-theme.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
