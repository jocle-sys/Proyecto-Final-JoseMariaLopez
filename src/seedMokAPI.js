import fetch from "node-fetch";

const FAKE_API = "https://fakestoreapi.com/products";
const MOCK_API = "https://686eed0e91e85fac429f52f2.mockapi.io/Productos"; 

async function seedMockAPI() {
  console.log("⏳ Obteniendo productos de FakeStoreAPI...");
  const res = await fetch(FAKE_API);
  const productos = await res.json();
  console.log(`✅ Se obtuvieron ${productos.length} productos.`);

  console.log("⏳ Eliminando productos existentes en MockAPI...");
  const existing = await fetch(MOCK_API).then(r => r.json());
  console.log(`ℹ️ Había ${existing.length} productos en MockAPI`);
  for (let prod of existing) {
    await fetch(`${MOCK_API}/${prod.id}`, { method: "DELETE" });
  }

  console.log("⏳ Insertando nuevos productos en MockAPI...");
  for (let prod of productos) {
    const nuevo = {
      title: prod.title,
      description: prod.description,
      price: prod.price,
      image: prod.image
    };

    const resp = await fetch(MOCK_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });

    const text = await resp.text();
    if (!resp.ok) {
      console.error("❌ Error al insertar:", text);
    } else {
      console.log(`✅ Agregado: ${nuevo.title}`);
    }
  }

  console.log("🎉 ¡Proceso terminado!");
}

seedMockAPI();
