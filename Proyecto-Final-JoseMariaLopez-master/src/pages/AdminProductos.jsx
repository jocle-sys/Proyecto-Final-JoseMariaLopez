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
    <div className="container py-4">
      <h2 className="mb-3">Administración de Productos</h2>

   
      <div className="alert alert-info">
        Los productos provienen de la API y solo pueden{" "}
        <strong>editarse</strong> o <strong>eliminarse</strong>.
      </div>

    
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="form-select"
          value={ordenPrecio}
          onChange={(e) => setOrdenPrecio(e.target.value)}
        >
          <option value="">Ordenar por precio...</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>

    
      <ul className="list-group">
        {productosFiltrados.map((prod) => (
          <li
            key={prod.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {/* Imagen y nombre */}
            <div className="d-flex align-items-center gap-3">
              <img
                src={prod.image}
                alt={prod.title}
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <div>
                <strong>{prod.title}</strong> - ${prod.price}
                <br />
                <small>{prod.description}</small>
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => confirmarEliminar(prod.id)}
              >
                Eliminar
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => setProductoEditando(prod)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

     
      {productoEditando && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
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
