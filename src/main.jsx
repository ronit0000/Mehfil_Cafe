import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getSitePage } from './data/site.js'

const root = document.getElementById('root')
const page = getSitePage(window.location.pathname)
const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
