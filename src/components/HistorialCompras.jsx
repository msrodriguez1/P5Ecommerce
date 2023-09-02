import React, { useContext, useEffect, useState } from 'react';
import { PerfilContext } from '../context/perfilContexto';
// import './HistorialCompras.css'

const HistorialCompras = () => {
  const { perfil } = useContext(PerfilContext);
  const [compras, setCompras] = useState(null);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('/compras.json');
        const data = await response.json();
        const comprasUsuario = data[perfil.id];
        setCompras(comprasUsuario);
      } catch (error) {
        console.error('Error fetching compras:', error);
      }
    };

    if (perfil) {
      fetchCompras();
    }
  }, [perfil]);

  if (!compras) {
    return <div>Cargando...</div>;
  }

  //...

return (<div className="container mt-5 flex-column">
<h5>Historial de Compras</h5>
<table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Precio</th>
      <th scope="col">Fecha</th>
    </tr>
  </thead>
  <tbody>
    {compras.map((compra, index) => (
      <tr key={index}>
        <td>{compra.producto}</td>
        <td>{compra.cantidad}</td>
        <td>{compra.precio}</td>
        <td>{compra.fecha}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>

  );

//...
};

export default HistorialCompras;





