🛍 Tienda Online con React + MockAPI
Este es un proyecto de Tienda Online desarrollado con React, que permite a los usuarios navegar por productos, agregarlos al carrito y simular una compra con un modal de datos de envío. Además, cuenta con un panel de administración protegido para gestionar los productos.

🚀 Tecnologías utilizadas
React + Vite

React Router DOM → Navegación

Context API → Manejo de estado global (Carrito y Auth)

MockAPI → API simulada para productos

React Toastify → Notificaciones

Bootstrap 5 → Estilos responsive

React Icons → Iconos para carrito y botones

✅ Funcionalidades
✔ Listado de productos cargados desde MockAPI
✔ Carrito persistente en LocalStorage
✔ Modal de checkout para ingresar datos de envío y método de pago
✔ Login Admin protegido para acceder al panel de administración
✔ Panel Admin para editar productos en MockAPI
✔ Protección de rutas (solo Admin puede entrar a /admin)
✔ Diseño responsive y minimalista


🔐 Acceso al Panel Admin
Para acceder al panel de administración:

Presiona el botón Login en la barra superior

Ingresa las credenciales:

Usuario: admin
Contraseña: 1234
Una vez logueado aparecerá el botón Admin en el menú.


🎨 Estilos
Fondo claro para resaltar productos con fondo blanco

Navbar simplificado mostrando:
✅ Carrito siempre visible
✅ Botón Admin solo si sos admin
✅ Botón Login/Logout según el estado

Cards de productos con hover suave y precios destacados

✅ Próximas mejoras
Guardar historial de pedidos en LocalStorage

Implementar pasarela de pago real (Stripe, MercadoPago)

Agregar filtros y búsqueda avanzada de productos

Mejorar el panel Admin para incluir creación y eliminación de productos