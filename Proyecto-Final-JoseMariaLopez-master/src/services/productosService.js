const API_URL = "https://686eed0e91e85fac429f52f2.mockapi.io/Productos";

export const obtenerProductos = async () => {
  const resp = await fetch(API_URL);
  return await resp.json(); 
};

export const crearProducto = async (prod) => {
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prod),
  });
  return await resp.json();
};

export const editarProducto = async (id, prod) => {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prod),
  });
  return await resp.json();
};

export const eliminarProducto = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
