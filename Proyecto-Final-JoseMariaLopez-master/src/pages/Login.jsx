import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
  const { usuarioAutenticado, login } = useAuth();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('cliente');

  const handleLogin = () => {
    login(tipo);
    navigate('/');
  };

  useEffect(() => {
    if (usuarioAutenticado) {
      navigate('/');
    }
  }, [usuarioAutenticado, navigate]);

  return (
    <div className="container text-center mt-5">
      <h2>Iniciar sesión</h2>
      <p>Seleccioná el tipo de usuario</p>

      <div className="mb-3">
        <select
          className="form-select w-50 mx-auto"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar sesión como {tipo}
      </button>
    </div>
  );
};

export default Login;
