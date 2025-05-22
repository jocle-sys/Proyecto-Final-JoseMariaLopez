import { Link } from 'react-router-dom';

const Navbar = ({ cantidad }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Tienda Online</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
          </ul>
          <span className="navbar-text text-white">
  <Link to="/carrito" className="text-white text-decoration-none">
    🛒 Carrito ({cantidad})
  </Link>
</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
