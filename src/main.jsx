import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import es_ES from 'antd/locale/es_ES';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      locale={es_ES}
      theme={{
        token: {
          // Seed Token
          colorPrimary: 'gray',
          borderRadius: 12,

          // Alias Token
          colorBgContainer: '#e9e9e9c7',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
