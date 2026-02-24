import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WidgetPage } from './WidgetPage'
import './widget.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WidgetPage />
  </StrictMode>,
)
