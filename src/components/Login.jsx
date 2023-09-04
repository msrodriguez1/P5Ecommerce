import React, { useContext, useState } from "react";
import { PerfilContext } from "../context/perfilContexto.jsx";
import { useAuth } from "../context/authContexto.jsx";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import Registro from './Registro.jsx';
// import './Login.css'


const Login = () => {
  const navigate = useNavigate();
  const { setPerfil } = useContext(PerfilContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(true);
  const { updateToken } = useAuth();


  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleMostrarRegistro = () => {
    setMostrarRegistro(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const botonStyle = {
    borderRadius: '0', // Bordes rectos
    fontFamily: 'Courier New, Courier', // Tipografía Courier
    fontSize: '14px', // Tamaño de fuente ajustado
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/usuarios.json');
      const data = await response.json();
      const users = data.usuarios;
      const user = users.find(user => user.usuario === email && user.password === password);
              
      if (user) {
        const tokenResponse = await fetch('/usuario/verificar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          const token = tokenData.token;
          // El usuario existe, actualizar el perfil en el contexto
          setPerfil({ id: user.id, email: user.email });
          updateToken.updateToken(token); // Corrección aquí
          console.log("Inicio Exitoso")
          navigate('/perfil');
        } else {
          // El usuario no existe, mostrar un mensaje de error
          alert('El email o la contraseña son incorrectos.');
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  

  return (
    <Modal show={mostrarModal} onHide={handleCerrarModal}>
    <Modal.Header closeButton>
      <Modal.Title>{mostrarRegistro ? 'Registrarse' : 'Iniciar sesión'}</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        {mostrarRegistro ? (
          <Registro />
        ) : (
          <div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={handleEmailChange} required />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={handlePasswordChange} required />
              </div>
              <div className="botones">
              <button type="submit" className="btn btn-secondary" style={botonStyle}>
                Iniciar sesión
              </button>
              <button onClick={handleMostrarRegistro} className="btn btn-secondary" style = {botonStyle}>Registrarse</button>
              </div>
            </form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Login;