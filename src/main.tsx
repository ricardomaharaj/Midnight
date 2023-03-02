import { createRoot } from 'react-dom/client'
import { App } from './App'
import './style.css'
import './spinner.css'

createRoot(document.querySelector('#root')!).render(<App />)
