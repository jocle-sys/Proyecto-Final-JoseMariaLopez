import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Carrito = () => {
  const navigate = useNavigate();
  const {
    carrito,
    vaciarCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
  } = useCarrito();

  const total = carrito.reduce(
    (acc, prod) => acc + prod.price * prod.cantidad,
    0
  );

  const [mostrarModal, setMostrarModal] = useState(false);

  
  const [checkoutData, setCheckoutData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    metodoPago: "Tarjeta",
  });

  const handleChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value,
    });
  };

  const finalizarCompra = () => {
  
    if (
      !checkoutData.nombre.trim() ||
      !checkoutData.email.trim() ||
      !checkoutData.direccion.trim() ||
      !checkoutData.ciudad.trim()
    ) {
      toast.error("Por favor completa todos los datos de envío");
      return;
    }


    toast.success(`✅ ¡Compra realizada con éxito, ${checkoutData.nombre}!`);
    vaciarCarrito();
    setMostrarModal(false);
    navigate("/productos");
  };

  return (
    <div className="container">
      <h2 className="mb-4">🛍 <strong>Carrito de Compras</strong></h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {carrito.map((prod) => (
              <li
                key={prod.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="flex-grow-1">
                  <strong>{prod.title}</strong><br />
                  <small>Precio unitario: ${prod.price}</small><br />
                  <small>Cantidad: {prod.cantidad}</small><br />
                  <small>Subtotal: ${(prod.price * prod.cantidad).toFixed(2)}</small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => eliminarDelCarrito(prod.id)}
                    >
                      -
                    </button>
                    <span className="btn btn-sm btn-light">{prod.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => aumentarCantidad(prod.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarDelCarrito(prod.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toFixed(2)}</h4>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-danger" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            
            <button
              className="btn btn-primary"
              onClick={() => setMostrarModal(true)}
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}

   
      {mostrarModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Datos de Envío y Pago</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Nombre y Apellido</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="nombre"
                  value={checkoutData.nombre}
                  onChange={handleChange}
                />

                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  name="email"
                  value={checkoutData.email}
                  onChange={handleChange}
                />

                <label className="form-label">Dirección de Envío</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="direccion"
                  value={checkoutData.direccion}
                  onChange={handleChange}
                />

                <label className="form-label">Ciudad / Provincia</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="ciudad"
                  value={checkoutData.ciudad}
                  onChange={handleChange}
                />

                <label className="form-label">Método de Pago</label>
                <select
                  name="metodoPago"
                  className="form-select"
                  value={checkoutData.metodoPago}
                  onChange={handleChange}
                >
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                  <option>Contra reembolso</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={finalizarCompra}>
                  Confirmar y Pagar ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
