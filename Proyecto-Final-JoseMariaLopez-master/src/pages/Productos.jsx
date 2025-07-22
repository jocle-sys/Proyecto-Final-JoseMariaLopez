import { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { obtenerProductos } from '../services/productosService';
import { toast } from 'react-toastify';

const Productos = () => {
  const { agregarAlCarrito } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center py-5 fw-bold">⏳ Cargando productos...</div>;
  if (error)
    return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">La Nueva </h2>

      <div className="row g-4">
        {productos.map((prod) => {
          const imagenMostrar = Array.isArray(prod.image)
            ? prod.image[0]
            : prod.image;

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <div className="card h-100 shadow-sm product-card">
                
                {imagenMostrar ? (
                  <img
                    src={imagenMostrar}
                    className="card-img-top p-3"
                    alt={prod.title}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                ) : (
                  <div
                    style={{
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f8f9fa',
                      color: '#aaa',
                      fontSize: '0.9rem',
                      borderRadius: '8px',
                    }}
                  >
                    Sin imagen
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                 
                  <h6 className="card-title text-truncate">
                    {prod.title}
                  </h6>

                  
                  <p className="card-text text-muted small">
                    {prod.description.length > 60
                      ? prod.description.slice(0, 60) + '...'
                      : prod.description}
                  </p>

                 
                  <p className="card-text text-success fw-bold fs-5">
                    ${prod.price}
                  </p>

                
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => {
                        agregarAlCarrito(prod);
                        toast.success('✅ Producto agregado al carrito!');
                      }}
                    >
                      🛒 Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
