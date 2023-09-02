import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = [];
  
  const [cart, setCart] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);


  const addToCart = (producto) => {
    setCart([...cart, producto]);
    setTotalPrice(totalPrice + (producto.precio * producto.cantidad));
    toast('Producto añadido al carrito!');

  };

  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = cart.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          cantidad: cantidad,
        };
      } else {
        return producto;
      }
    });
    setCart(nuevoCarrito);
  };
  

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = cart.filter(producto => producto.id !== id);
    setCart(nuevoCarrito);
    // Actualizar el precio total
    const newTotalPrice = nuevoCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    setTotalPrice(newTotalPrice);
    toast('Producto eliminado del carrito!');
  }

  return (
    <CartContext.Provider value={{ cart,totalPrice, addToCart, actualizarCantidad,eliminarDelCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
