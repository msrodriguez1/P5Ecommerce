import React, { useContext,useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { CartContext } from '../context/carritoContexto.jsx';
import ProductoCarrito from '../components/ProductoCarrito.jsx';
import { useNavigate } from 'react-router-dom';
import Atras from '../components/BotonAtras.jsx'
// import './carritoPage.css'

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
      <Container className="mt-5">
        {cart.map((producto, index) => (
          <ProductoCarrito 
            key={index} 
            producto={producto} 
            actualizarCantidad={actualizarCantidad}
          />
        ))}
      </Container>
      <div>
          <h3 className="mb-4">Precio total: {totalPrice}</h3>
          <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/checkout')}>Pagar</button>
      </div>
      <Atras />
    </div>
  );
  

// ...

};

export default CarritoPage;

