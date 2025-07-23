import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaPrivada = ({ children, soloAdmin = false }) => {
  const { rol } = useAuth();

  if (soloAdmin && rol !== "admin") {
    return <Navigate to="/productos" replace />;
  }

  return children;
};

export default RutaPrivada;
