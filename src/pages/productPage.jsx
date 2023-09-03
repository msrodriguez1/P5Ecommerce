
import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/carritoContexto';
import Atras from '../components/BotonAtras.jsx'
import './productPage.css'
import perfume1 from '../assets/perfume1.jpeg';
import perfume2 from '../assets/perfume2.jpeg';
import perfume3 from '../assets/perfume3.jpeg';
import perfume4 from '../assets/perfume4.jpeg';
import perfume5 from '../assets/perfume5.jpeg';
import perfume6 from '../assets/perfume6.jpeg';

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
  <div>
<div className="container-fluid mt-5">
    <div className="row">
        <div className="col-md-6 mb-4">
        <img  src={
    producto.id === 1
      ? perfume1
      : producto.id === 2
      ? perfume2
      : producto.id === 3
      ? perfume3
      : producto.id === 4
      ? perfume4
      : producto.id === 5
      ? perfume5
      : producto.id === 6
      ? perfume6
      : ''
  }  style={{ width: '450px', maxHeight: '450px', objectFit: 'cover' }}/>
        </div>
        <div className="col-md-6">
            <h1 className="title3">{producto.nombre}</h1>
            <p className="title2">{producto.descripcion}</p>
            <p className="font-weight-bold elementos">{producto.precio} {producto.moneda}</p>
            <button
  className="btn btn-secondary" // Cambia la clase a "btn btn-secondary"
  onClick={() => addToCart(producto)}
  style={{ borderRadius: '0',
  height: '30px',
  lineHeight: '20px',
  background: 'black',
  color: 'white',
  fontFamily: 'Courier New, Courier',
  fontSize: '13px' }}
>
  Añadir al carrito
</button>          </div>
    </div>

</div>
    <Atras/>
    </div>
);

// ...

}

export default ProductPage;
