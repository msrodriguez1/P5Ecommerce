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
import Atras from './components/BotonAtras'


function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
     <div className="wrapper">
      <div className="main-content">
      <PerfilProvider>
      <CartProvider value={{ cart, setCart }}>

      <NavBar />
        <MainRouter />
      <ToastContainer />
      {/* <SubCatalogo products={products} /> */}
      {/* Dejar componente atrás acá y fixed */}
      <Atras/>
      <div className="footer">
<Footer />
</div>
      </CartProvider>
      </PerfilProvider>
      </div>
    </div>
    </>

  );
}

export default App;



