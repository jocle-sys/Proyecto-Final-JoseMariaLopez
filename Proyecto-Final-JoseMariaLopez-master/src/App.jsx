import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';
import { useCarrito } from './context/CarritoContext'; 
import RutaPrivada from './components/RutaPrivada';
import AdminProductos from './pages/AdminProductos';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { carrito } = useCarrito(); 

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cantidad={carrito.length} />

      <div className="flex-grow-1">
        <Routes>
          
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/" element={<Navigate to="/productos" />} />

          
          <Route path="/carrito" element={<Carrito />} />

          
          <Route
            path="/admin"
            element={
              <RutaPrivada soloAdmin>
                <AdminProductos />
              </RutaPrivada>
            }
          />
        </Routes>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
