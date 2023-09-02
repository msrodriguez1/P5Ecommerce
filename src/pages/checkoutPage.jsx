import React, { useState } from 'react';
// import './checkoutPage.css'

const Checkout = () => {
  const [entrega, setEntrega] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horario, setHorario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Procesa la información de la compra
    // ...
  };

  // ...

return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-5 bg-light rounded">
        <h1 className="mb-4 title1">Checkout</h1>
        <div className="form-group mb-3">
          <label>Forma de entrega</label>
          <div>
            <button type="button" className="btn btn-outline-secondary mr-3" onClick={() => setEntrega('domicilio')}>Despacho a domicilio</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setEntrega('pickup')}>Pickup</button>
          </div>
        </div>
        {entrega === 'domicilio' && (
          <div className="form-group mb-3">
            <label>Dirección de despacho</label>
            <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
        )}
        <div className="form-group mb-3">
          <label>Horario</label>
          <select className="form-control" value={horario} onChange={(e) => setHorario(e.target.value)}>
            <option value="manana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline-secondary btn-block">Continuar</button>
      </form>
    </div>
  );
  
  // ...
  
};

export default Checkout;