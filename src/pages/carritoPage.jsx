import React, { useContext,useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CartContext } from '../context/carritoContexto.jsx';
import ProductoCarrito from '../components/ProductoCarrito.jsx';
import { useNavigate } from 'react-router-dom';
import Atras from '../components/BotonAtras.jsx'
import './carritoPage.css'

const CarritoPage = () => {
  const navigate= useNavigate();
  const { cart,actualizarCantidad } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    let total = 0;
    cart.forEach(producto => {
      total += producto.precio * producto.cantidad;
    });
    setTotalPrice(total);
  }, [cart]);


// ...

return (
    <div style={{ minHeight: 'calc(100vh - 100px)' }}>
          {/* <h5 className="title1">Carrito</h5> */}
      <Container className="mt-5 custom-container">
        {cart.map((producto, index) => (
          <ProductoCarrito 
            key={index} 
            producto={producto} 
            actualizarCantidad={actualizarCantidad}
          />
        ))}
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h5 className="title1">Precio total: {totalPrice} EUR</h5>
    
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/checkout')} style={{ borderRadius: '0',
  height: '40px',
  lineHeight: '30px',
  background: 'black',
  color: 'white',
  fontFamily: 'Courier New, Courier',
  fontSize: '18px' }}>continuar</button>
    </div>
    </div>
  );
  

// ...

};

export default CarritoPage;

