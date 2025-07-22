import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { obtenerProductos } from '../services/productosService';
import { toast } from 'react-toastify';

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerProductos(); 
        const seleccionado = data.find((item) => item.id === id);
        setProducto(seleccionado);
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Cargando producto...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!producto) return <div className="text-center mt-4">Producto no encontrado</div>;

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto);
    toast.success('✅ Producto agregado al carrito!');
  };

  return (
    <div className="container mt-5">
      <div className="detalle-producto p-4 rounded">
        <div className="row">
          
          
          <div className="col-md-6 text-center">
            {Array.isArray(producto.image) && producto.image.length > 1 ? (
              <div id="carouselImages" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {producto.image.map((img, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`imagen-${index}`}
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                      />
                    </div>
                  ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            ) : (
              
              <img
                src={Array.isArray(producto.image) ? producto.image[0] : producto.image}
                alt={producto.title}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            )}
          </div>

       
          <div className="col-md-6">
            <h2 className="fw-bold">{producto.title}</h2>
            <p className="mt-3">{producto.description}</p>
            <h3 className="text-success mt-3">${producto.price}</h3>

            <button className="btn btn-primary btn-lg mt-4" onClick={handleAgregarCarrito}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
