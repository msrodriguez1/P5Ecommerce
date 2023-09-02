import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/carritoContexto';
import Atras from '../components/BotonAtras.jsx'
// import './catalogoPage.css'



export const CatalogoPage = () => {
  const [productos, setProductos] = useState([]);
  const { cart, addToCart } = useContext(CartContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  


  useEffect(() => {
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch('http://localhost:3005/obtener-productos');
            const datos = await respuesta.json();
            setProductos(datos.productos);
            setProductosFiltrados(datos.productos);
        } catch (error) {
            console.error('Error cargando los productos:', error);
        }
    };
    cargarProductos();
}, []);



  const filtrarProductos = () => {
    if (categoriaSeleccionada === "") {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(
        productos.filter((producto) => producto.categoria === categoriaSeleccionada)
      );
    }
  };
  

  // ...
  return (
    <div >
        <h1 className="text-center mb-5">Catálogo de productos</h1>
        <div className="row">
            <div className="col-12 mb-4">
                <select
                    className="form-control"
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Calzado">Calzado</option>
                    {/* Agrega aquí más categorías si las tienes */}
                </select>
                <button className="btn btn-primary mt-2" onClick={filtrarProductos}>
                    Filtrar
                </button>
            </div>
            {productosFiltrados.map(producto => (
                <div key={producto.id} className="col-12 mb-4">
                    <div className="card">
                        <Link to={`/producto/${producto.id}`}>
                            <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">{producto.nombre}</h5>
                            <p className="card-text">{producto.descripcion}</p>
                            <p className="card-text">{producto.precio} {producto.moneda}</p>
                            <button className="btn btn-outline-secondary btn-block" onClick={() => addToCart(producto)}>Añadir al carrito</button>
                        </div>
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
 