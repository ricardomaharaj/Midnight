import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { register } from './serviceWorkerRegistration'
import './index.css'
import { App } from './App'

createRoot(document.querySelector('#root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)

register()
