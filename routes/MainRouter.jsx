import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from "../src/pages/homePage";
import { CatalogoPage } from "../src/pages/catalogoPage";
import { ProductPage } from "../src/pages/productPage";
import CarritoPage from "../src/pages/carritoPage";
import LoginPage from '../src/pages/inicioPage';
import PerfilPage from '../src/pages/perfilPage';
import Login from '../src/components/Login';
import Checkout from '../src/pages/checkoutPage';





export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductPage/>} />
        <Route path='/carrito' element={<CarritoPage />} />
        <Route path='/perfil' element={<PerfilPage />} />
        <Route path='/success-portage' element={<successPortage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/loginC' element={<Login/>} />
        <Route path="/checkout" element={<Checkout />} />




      {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};