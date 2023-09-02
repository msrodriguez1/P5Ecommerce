import React from 'react';
import './Footer.css'; // Puedes incluir un archivo CSS si deseas estilizar el componente

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Tu Compañía. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
