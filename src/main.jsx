import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#F5EDD6',
          border: '1px solid rgba(212,168,67,0.3)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          iconTheme: { primary: '#D4A843', secondary: '#0A0A0A' },
        },
        error: {
          iconTheme: { primary: '#E8782A', secondary: '#0A0A0A' },
        },
      }}
    />
  </StrictMode>,
)
