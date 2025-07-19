import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Add this
import './index.css'
import App1 from './App1'; // Renamed from App1.tsx to match original

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <App1 />
    </BrowserRouter>
  </StrictMode>
)