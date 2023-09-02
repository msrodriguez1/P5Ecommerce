// Componente ProductoCarrito.js

// Componente ProductoCarrito.js
import React, { useContext } from 'react';
import { CartContext } from '../context/carritoContexto';
import './ProductoCarrito.css'

const ProductoCarrito = ({ producto }) => {
  const { actualizarCantidad, eliminarDelCarrito } = useContext(CartContext);

  const handleChange = (event) => {
    actualizarCantidad(producto.id, event.target.value);
  };

  const handleEliminar = () => {
    eliminarDelCarrito(producto.id);
  };
  

  return (
<div className="d-flex align-items-center mb-4" style={{ marginLeft: '20px' }}>
  <img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{ width: '200px', maxHeight: '200px', objectFit: 'cover' }} />
  <div className="ml-3">
    <h5 className="title11">{producto.nombre}</h5>
    <p className="title1">{producto.precio} {producto.moneda}</p>
    <div className="d-flex align-items-center">
      <label htmlFor="cantidad" className="mr-2">Cantidad:</label>
      <input type="number" id="cantidad"  style={{ width: '50px' }} value={producto.cantidad || 1} onChange={handleChange} min={1} />
    </div>
    <button className="btn btn-link text-dark p-0 mt-2" onClick={handleEliminar}>Eliminar</button>
  </div>
</div>

  );
};

export default ProductoCarrito;

