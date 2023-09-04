import { useNavigate } from 'react-router-dom';
// import './BotonAtras.css'

const Atras = () => {
  const navigate = useNavigate();

  const botonStyle = {
    borderRadius: '0', // Bordes rectos
    fontFamily: 'Courier New, Courier', // Tipografía Courier
    fontSize: '14px', // Tamaño de fuente ajustado
  };

  return (
    <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}     style={botonStyle}>Atrás</button>
  );
};

export default Atras;

