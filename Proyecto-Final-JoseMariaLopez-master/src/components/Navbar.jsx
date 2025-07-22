import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cantidad }) => {
  const { login, logout, rol } = useAuth();
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [credenciales, setCredenciales] = useState({ usuario: "", password: "" });

  const handleInputChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (credenciales.usuario === "admin" && credenciales.password === "1234") {
      login("admin");
      setMostrarModal(false);
      setCredenciales({ usuario: "", password: "" });
      toast.success("¡Bienvenido Administrador!");
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCredenciales({ usuario: "", password: "" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container">
          
          <Link className="navbar-brand fw-bold" to="/">
            🛍 TIENDA ONLINE
          </Link>

          <div className="ms-auto d-flex align-items-center gap-3">
            
            <Link
              to="/carrito"
              className="text-dark fw-bold text-decoration-none"
            >
              🛒 Carrito ({cantidad})
            </Link>

           
            {rol === "admin" && (
              <Link
                to="/admin"
                className="btn btn-outline-primary btn-sm"
              >
                Admin
              </Link>
            )}

           
            {rol === "admin" ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/"); // redirige siempre a inicio
                }}
                className="btn btn-sm btn-danger"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setMostrarModal(true)}
                className="btn btn-sm btn-primary"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

     
      {mostrarModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Admin</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  name="usuario"
                  className="form-control mb-3"
                  placeholder="Usuario"
                  value={credenciales.usuario}
                  onChange={handleInputChange}
                />
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={credenciales.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleLogin}>
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
