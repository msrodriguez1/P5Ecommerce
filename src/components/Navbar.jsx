import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PerfilContext } from '../context/perfilContexto';
import { useNavigate } from 'react-router-dom';
// import './Navbar.css'



export const NavBar = () => {
  const { perfil, setPerfil } = useContext(PerfilContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setPerfil(null);
    navigate('/');

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Inicio</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogo">Catalogo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
            </li>
            {perfil ? (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/perfil">Mi Perfil</NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar Sesión</button>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};