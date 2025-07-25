import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const savedRol = localStorage.getItem("rol");

    if (auth === "true" && savedRol === "admin") {
      setUsuarioAutenticado(true);
      setRol("admin");
      if (window.location.pathname !== "/admin") {
        navigate("/admin", { replace: true });
      }
    } else {
      setUsuarioAutenticado(false);
      setRol(null);
    }
  }, [navigate]);

  const login = () => {
    setUsuarioAutenticado(true);
    setRol("admin");
    localStorage.setItem("auth", "true");
    localStorage.setItem("rol", "admin");
  };

  const logout = () => {
    setUsuarioAutenticado(false);
    setRol(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("rol");
  };

  return (
    <AuthContext.Provider value={{ usuarioAutenticado, login, logout, rol }}>
      {children}
    </AuthContext.Provider>
  );
};
