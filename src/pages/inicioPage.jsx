// LoginPage.js
import React from "react";
import Login from "../components/Login";
import Atras from '../components/BotonAtras.jsx'
// import './inicioPage.css'

const LoginPage = () => {
// ...

return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 p-5 bg-light rounded">
          <Login />
 
        </div>
        <Atras />
      </div>
    </div>
  );
  
  // ...
  
};

export default LoginPage;
 