import React from "react";
import { useAuth } from "./AuthContext";

const UsuarioContext = React.createContext();

function UsuarioProvider(props) {
  const { data } = useAuth();
  const isLogged = !!data;

  return <UsuarioContext.Provider value={{ isLogged, usuario: data }} {...props} />;
}

function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error(`useUsuario must be used within a UsuarioProvider`);
  }
  return context;
}

export { UsuarioProvider, useUsuario };
