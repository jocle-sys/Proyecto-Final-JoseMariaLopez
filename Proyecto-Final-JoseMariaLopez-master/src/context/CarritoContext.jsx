import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const data = localStorage.getItem('carrito');
    return data ? JSON.parse(data) : [];
  });

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    const producto = carrito.find((item) => item.id === id);

    if (producto.cantidad > 1) {
      const actualizado = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito(carrito.filter((item) => item.id !== id));
    }
  };

  const aumentarCantidad = (id) => {
    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(actualizado);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        aumentarCantidad, 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
