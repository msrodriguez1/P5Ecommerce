import { useNavigate } from 'react-router-dom';
import './BotonAtras.css'

const Atras = () => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-outline-secondary mt-4" onClick={() => navigate(-1)}>Atrás</button>
  );
};

export default Atras;

