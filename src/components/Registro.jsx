import React, { useState } from 'react';
import Login from './Login';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Registro.css'




const Registro = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer una petición a tu API para registrar al usuario
    // Por ahora, solo vamos a imprimir los datos en la consola
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <h1>Registrate</h1> */}
        <label>Nombre</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Apellido</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Registrar</button>
      <button onClick={() => navigate('/loginC')}>Iniciar sesión</button>

    </form>
  );
};

export default Registro;
