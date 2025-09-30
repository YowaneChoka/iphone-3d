import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import * as Sentry from "@sentry/react";
import React from 'react';

Sentry.init({
  dsn: "https://6b6e027897a016431a98c861a0c8ba5e@o4510012849324032.ingest.us.sentry.io/4510109734862848",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations:[
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect
    })
  ]
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
