import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Modecontextprovider } from './Context/Modecontext.jsx'

createRoot(document.getElementById('root')).render(
  <Modecontextprovider>
    <App />
  </Modecontextprovider>,
)
