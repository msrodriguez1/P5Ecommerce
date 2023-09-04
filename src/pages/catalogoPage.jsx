import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/carritoContexto';
import Atras from '../components/BotonAtras.jsx'
import './catalogoPage.css'



export const CatalogoPage = () => {
  const [productos, setProductos] = useState([]);
  const { cart, addToCart } = useContext(CartContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  


  useEffect(() => {
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3007/obtener-productos');
            const datos = await respuesta.json();
            setProductos(datos.productos);
            setProductosFiltrados(datos.productos);
        } catch (error) {
            console.error('Error cargando los productos:', error);
        }
    };
    cargarProductos();
}, []);



const filtrarProductos = (value) => {
  setCategoriaSeleccionada(value);
  if (value === "") {
    setProductosFiltrados(productos);
  } else {
    setProductosFiltrados(
      productos.filter((producto) => producto.categoria === value)
    );
  }
};
  

  // ...
  return (

    <div>
    {/* <h5 className="titulo">Catálogo de productos</h5> */}
    <img className="moai" src="src/assets/portada9.jpeg"   style={{ display: 'block', margin: 'auto', maxWidth: '800px', objectFit: 'cover', marginBottom: '30px'}}
></img>
    <div className="row mb-4">
        <div className="col-12 col-md-4">
            <select
                className="my-select"
                value={categoriaSeleccionada}
                onChange={(e) => filtrarProductos(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                <option value="Floral">Floral</option>
                <option value="Maderas">Maderas</option>
                <option value="Citricos">Citricos</option>
                {/* Agrega aquí más categorías si las tienes */}
            </select>
        </div>
        {/* <div className="col-12 col-md-2">
            <button className="btn btn-outline-secondary" onClick={filtrarProductos}>
                Filtrar
            </button>
        </div> */}
    </div>
    <div className="row">
        {productosFiltrados.map(producto => (
            <div key={producto.id} className="col-md-4 mb-4">
                <div className="card">
                    <Link to={`/producto/${producto.id}`}>
                        <img src={producto.imagen} alt={producto.nombre} className="card-img-top mx-auto d-block" style={{ width: '300px', maxHeight: '300px', objectFit: 'cover' }} />
                    </Link>
                    <div className="card-body text-center">
                        <h5 className="card-title">{producto.nombre}</h5>
                        {/* <p className="card-text">{producto.descripcion}</p> */}
                        <p className="card-text">{producto.precio} {producto.moneda}</p>
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
</button>                    </div>
                </div>
            </div>
        ))}
    </div>
    <Atras />
</div>


)

  

// ...

}

export default CatalogoPage;
 