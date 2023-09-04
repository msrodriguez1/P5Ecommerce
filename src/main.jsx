import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/carritoContexto';
import  PerfilProvider  from './context/perfilContexto';
import  {AuthProvider}  from './context/authContexto';


import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <PerfilProvider>
    <CartProvider>
      <App />
      </CartProvider>
      </PerfilProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
