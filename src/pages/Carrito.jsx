import { useNavigate } from 'react-router-dom';

const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();

  const total = carrito.reduce((acc, prod) => acc + prod.price, 0);

  const pagar = () => {
    alert('¡Compra realizada con éxito!');
    setCarrito([]); // vacía el carrito
    navigate('/productos'); // redirige a productos
  };

  return (
    <div className="container">
      <h2 className="mb-4">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {carrito.map((prod, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{prod.title}</strong><br />
                  <small>${prod.price}</small>
                </div>
                <img src={prod.image} alt={prod.title} width={50} height={50} style={{ objectFit: "contain" }} />
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-primary mt-3" onClick={pagar}>
            Pagar
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
