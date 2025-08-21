import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage.jsx'
import DashBoard from './components/DashBoard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashBoard/>
    {/* <LoginPage/> */}
  </StrictMode>,
)
