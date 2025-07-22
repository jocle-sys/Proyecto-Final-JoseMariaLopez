import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaPrivada = ({ children, soloAdmin = false }) => {
  const { usuarioAutenticado, rol } = useAuth();


  if (!usuarioAutenticado) return <Navigate to="/productos" />;

 
  if (soloAdmin && rol !== 'admin') return <Navigate to="/productos" />;

  
  return children;
};

export default RutaPrivada;

