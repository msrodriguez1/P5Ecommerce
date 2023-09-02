import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 import './SubCatalogo.css'; // Crea este archivo para tus estilos personalizados
 import { CartContext } from '../context/carritoContexto';





export const SubCatalogo  =()=> {
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Cargar los productos desde el archivo JSON cuando el componente se monta
    const cargarProductos = async () => {
      const respuesta = await fetch('catalogo.json');
      const datos = await respuesta.json();
      setProductos(datos.productos);
    };

    cargarProductos();
  }, []);

        const settings = {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        };
      
        return (
          <div className="product-carousel">
            <Slider {...settings}>
              {productos.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.nombre}</h3>
                  <Link to={`/producto/${product.id}`}>
                  <img src={product.imagen} alt={product.nombre}/>
                  </Link>

                  <button onClick={() => addToCart(product)}>Añadir al carrito</button>
                </div>
              ))}
            </Slider>
          </div>
        );
      };
      
      export default SubCatalogo;
