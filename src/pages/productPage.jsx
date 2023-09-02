
import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/carritoContexto';
import Atras from '../components/BotonAtras.jsx'
// import './productPage.css'

import '../assets/perfume1.jpeg'


export const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch('http://localhost:3005/obtener-productos');
                if (!respuesta.ok) {
          throw new Error('No se pudo cargar el catálogo de productos');
        }
        const datos = await respuesta.json();
        const producto = datos.productos.find(p => p.id === parseInt(id));
        if (!producto) {
          throw new Error('Producto no encontrado');
        }
        setProducto(producto);
        console.log(producto.imagen)
      } catch (error) {
        setError(error.message);
      }
    };

    cargarProducto();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

// ...

return (
<div className="container mt-5">
    <div className="row">
        <div className="col-md-6 mb-4">
        <img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{ width: '300px', maxHeight: '300px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6">
            <h1>{producto.nombre}</h1>
            <p className="text-justify">{producto.descripcion}</p>
            <p className="font-weight-bold">{producto.precio} {producto.moneda}</p>
            <button className="btn btn-outline-secondary btn-block mb-4" onClick={() => addToCart(producto)}>Añadir al carrito</button>
        </div>
    </div>
    <Atras/>
</div>

);

// ...

}

export default ProductPage;
