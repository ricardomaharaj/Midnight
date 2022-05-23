import { createRoot } from 'react-dom/client'
import { register as SWRegister } from './serviceWorkerRegistration'
import { App } from './App'
import './index.css'

createRoot(document.querySelector('#root')!).render(<App />)

SWRegister()
