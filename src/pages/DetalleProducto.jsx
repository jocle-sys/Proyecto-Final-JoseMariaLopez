import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} width="200" />
      <p>{producto.description}</p>
      <p><strong>${producto.price}</strong></p>
    </div>
  );
};

export default DetalleProducto;
