import { useEffect, useState } from "react";
import {
  obtenerProductos,
  editarProducto,
  eliminarProducto,
} from "../services/productosService";
import { toast } from "react-toastify";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        setProductos([]);
      }
    } catch (error) {
      toast.error("❌ Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const confirmarEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      await eliminarProducto(id);
      toast.warn("🗑 Producto eliminado");
      cargarProductos();
    }
  };

  const guardarEdicion = async () => {
    if (!productoEditando) return;
    await editarProducto(productoEditando.id, productoEditando);
    toast.success("✅ Producto actualizado");
    setProductoEditando(null);
    cargarProductos();
  };

  let productosFiltrados = productos.filter((prod) =>
    prod.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (ordenPrecio === "asc") {
    productosFiltrados = productosFiltrados.sort((a, b) => a.price - b.price);
  } else if (ordenPrecio === "desc") {
    productosFiltrados = productosFiltrados.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container-fluid py-4 px-4">
      <h2 className="mb-4 text-center fw-bold">📦 Administración de Productos</h2>

      <div className="alert alert-info text-center">
        Los productos provienen de la API y solo pueden <strong>editarse</strong> o <strong>eliminarse</strong>.
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Buscar producto por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="">Ordenar por precio...</option>
            <option value="asc">⬆ Menor a mayor</option>
            <option value="desc">⬇ Mayor a menor</option>
          </select>
        </div>
      </div>

      <div className="table-responsive w-100">
        <table className="table table-striped align-middle text-center w-100">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "80px" }}>Imagen</th>
              <th style={{ width: "20%" }}>Producto</th>
              <th>Descripción</th>
              <th style={{ width: "120px" }}>Precio</th>
              <th style={{ width: "160px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id} className="fila-producto">
                <td>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    width={60}
                    height={60}
                    style={{ objectFit: "contain" }}
                  />
                </td>
                <td className="fw-bold">{prod.title}</td>
                <td className="text-muted small">
                  {prod.description.length > 80
                    ? prod.description.slice(0, 80) + "..."
                    : prod.description}
                </td>
                <td className="fw-bold text-success">${prod.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setProductoEditando(prod)}
                  >
                    ✏ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmarEliminar(prod.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productoEditando && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✏ Editar Producto</h5>
                <button
                  className="btn-close"
                  onClick={() => setProductoEditando(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Título del producto</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={productoEditando.title}
                  onChange={(e) =>
                    setProductoEditando({
                      ...productoEditando,
                      title: e.target.value,
                    })
                  }
                />

                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control mb-3"
                  value={productoEditando.description}
                  onChange={(e) =>
                    setProductoEditando({
                      ...productoEditando,
                      description: e.target.value,
                    })
                  }
                />

                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={productoEditando.price}
                  onChange={(e) =>
                    setProductoEditando({
                      ...productoEditando,
                      price: parseFloat(e.target.value),
                    })
                  }
                />

                <label className="form-label">URL de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  value={productoEditando.image}
                  onChange={(e) =>
                    setProductoEditando({
                      ...productoEditando,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setProductoEditando(null)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarEdicion}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
