
import React, { useContext, useEffect, useState } from 'react';
import { PerfilContext } from '../context/perfilContexto';
import HistorialCompras from '../components/HistorialCompras'
import Atras from '../components/BotonAtras.jsx'
// import './perfilPage.css'


const PerfilPage = () => {
  const { perfil } = useContext(PerfilContext);
  const [usuario, setUsuario] = useState(null);
  console.log({perfil})

//   useEffect(() => {
//     const fetchUsuario = async () => {
//       try {
//         const response = await fetch('./usuarios.json');
//         const data = await response.json();
//         const usuarios = data.usuarios;
//         const usuario = usuarios.find(user => user.email === perfil.email);
//         console.log(perfil.id)
//         setUsuario(usuario);
//       } catch (error) {
//         console.error('Error fetching usuario:', error);
//       }
//     };

//     if (perfil) {
//       fetchUsuario();
//     }
//   }, [perfil]);

//   if (!usuario) {
//     return <div>Cargando...</div>;
//   }

  // ...

  return (
<div className="container mt-5 flex-column">
    <div className="perfil mb-5 p-5 bg-light rounded">
        <h2>Mi Perfil</h2>
        <p><strong>Nombre:</strong> {perfil.nombre}</p>
        <p><strong>Apellido:</strong> {perfil.apellido}</p>
        <p><strong>Direccion:</strong> {perfil.direccion}</p>
        <img src={perfil._id} alt={`${perfil.nombre} ${perfil.apellido}`} className="img-fluid rounded" />
    </div>
    <div className="historialCompras mb-5 flex-column">
        <HistorialCompras/>
    </div>
    <div className="text-center">
        <Atras/>
    </div>
</div>
  );

// ...

};

export default PerfilPage;