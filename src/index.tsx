import { createRoot } from 'react-dom/client'
import { registerSW } from './SWRegister'
import { App } from './App'
import './style.css'

createRoot(document.querySelector('#root')!).render(<App />)

registerSW()
