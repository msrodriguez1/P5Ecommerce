// Componente ProductoCarrito.js

// Componente ProductoCarrito.js
import React, { useContext } from 'react';
import { CartContext } from '../context/carritoContexto';

const ProductoCarrito = ({ producto }) => {
  const { actualizarCantidad, eliminarDelCarrito } = useContext(CartContext);

  const handleChange = (event) => {
    actualizarCantidad(producto.id, event.target.value);
  };

  const handleEliminar = () => {
    eliminarDelCarrito(producto.id);
  };
  

  return (
<div className="d-flex align-items-center mb-4" >
  <img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{width: '50px'}} />
  <div className="ml-3">
    <h5>{producto.nombre}</h5>
    <p>{producto.precio} {producto.moneda}</p>
    <div className="d-flex align-items-center">
      <label htmlFor="cantidad" className="mr-2">Cantidad:</label>
      <input type="number" id="cantidad" value={producto.cantidad || 1} onChange={handleChange} min={1} />
    </div>
    <button className="btn btn-link p-0 mt-2" onClick={handleEliminar}>Eliminar</button>
  </div>
</div>

  );
};

export default ProductoCarrito;

