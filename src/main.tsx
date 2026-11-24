import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MetaMaskProvider } from './context/MetaMaskProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </StrictMode>,
)
