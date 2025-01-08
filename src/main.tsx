import React from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/i18n.ts'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import ThemeWrapper from '@/layout/ThemeWrapper.tsx'
import { store } from '@/redux/store.ts'
import Router from '@/router.tsx'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeWrapper>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeWrapper>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
