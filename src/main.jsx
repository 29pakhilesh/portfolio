import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/geist-mono'
import '@fontsource/shippori-mincho/latin-500.css'
import '@fontsource/shippori-mincho/latin-600.css'
import './fonts/japanese.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
