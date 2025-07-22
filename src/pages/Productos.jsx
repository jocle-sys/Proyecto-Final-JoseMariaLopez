import { useEffect, useState } from 'react';

const Productos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Cargando productos...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container">
      <h2 className="mb-4">Lista de Productos</h2>
      <div className="row">
        {productos.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-100">
              <img
                src={prod.image}
                className="card-img-top p-3"
                alt={prod.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.title.slice(0, 40)}...</h5>
                <p className="card-text">{prod.description.slice(0, 80)}...</p>
                <p className="card-text"><strong>${prod.price}</strong></p>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() => agregarAlCarrito(prod)}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
