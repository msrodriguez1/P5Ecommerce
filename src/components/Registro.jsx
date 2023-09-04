import React, { useState } from 'react';
import Login from './Login';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Registro.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 




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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch('/usuarios.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Usuario registrado exitosamente');
          toast('Registro exitoso');
          navigate('/loginC');
        } else {
          console.error('Error al registrar el usuario');
          toast('Error al intentar registrar usuario');

        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    console.log(formData);
  };


  
  const botonStyle = {
    borderRadius: '0', // Bordes rectos
    fontFamily: 'Courier New, Courier', // Tipografía Courier
    fontSize: '14px', // Tamaño de fuente ajustado
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
      <button type="submit" style={botonStyle}>Registrar</button>
      <button onClick={() => navigate('/loginC')} style={botonStyle}>Iniciar sesión</button>

    </form>
  );
};

export default Registro;
