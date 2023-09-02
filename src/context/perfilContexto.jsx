import React, { createContext, useState } from 'react';

export const PerfilContext = createContext();

const PerfilProvider = (props) => {
  const [perfil, setPerfil] = useState(null);

  return (
    <PerfilContext.Provider value={{ perfil, setPerfil }}>
      {props.children}
    </PerfilContext.Provider>
  );
};

export default  PerfilProvider;


