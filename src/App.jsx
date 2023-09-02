import React, { useContext,useEffect,useState  } from 'react';
import { CartContext } from './context/carritoContexto';
import { NavBar } from "./components/Navbar";
import  {Footer}  from "./components/Footer_com";
import { MainRouter } from "../routes/MainRouter";
// import './App.css'
import {db} from './firebase/firebase'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import SubCatalogo from './components/SubCatalogo';
import  PerfilProvider from './context/perfilContexto';
import { CartProvider } from './context/carritoContexto';





const products = [
  { id: 1, name: 'Producto 1', imageUrl: 'Atun.jpeg' },
  { id: 2, name: 'Producto 2', imageUrl: 'imagen2.jpg' },
  { id: 3, name: 'Producto 3', imageUrl: 'imagen3.jpg' },
  { id: 4, name: 'Producto 4', imageUrl: 'imagen4.jpg' },
  { id: 5, name: 'Producto 5', imageUrl: 'imagen5.jpg' },
  { id: 6, name: 'Producto 6', imageUrl: 'imagen4.jpg' },
  { id: 7, name: 'Producto 7', imageUrl: 'imagen5.jpg' },

  // Agrega más productos aquí
];

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <PerfilProvider>
      <CartProvider value={{ cart, setCart }}>

      <NavBar />
        <MainRouter />
      <ToastContainer />
      {/* <SubCatalogo products={products} /> */}
      <Footer />

      </CartProvider>
      </PerfilProvider>
    </>
  );
}

export default App;
