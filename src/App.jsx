import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';

const App = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cantidad={carrito.length} />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos"element={<Productos agregarAlCarrito={agregarAlCarrito} />}/>
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
