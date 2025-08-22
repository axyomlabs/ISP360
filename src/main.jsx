import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- required for dropdown

import LoginPage from './pages/LoginPage.jsx'
import DashBoard from './pages/DashBoard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashBoard/>
    {/* <LoginPage/> */}
  </StrictMode>,
)
