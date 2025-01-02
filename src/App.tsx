import {
  getAllCategorias,
  getAllProductosByCategoria,
  getProductos,
} from "./services/products";
import "./App.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Producto } from "./components/producto";
import { ProductoInterface } from "./models/producto";
import { Filtro } from "./components/filtro";

import { useFilters } from "./hooks/useFilters";

function App() {
  const { filters, setCategorias } = useFilters();
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState<ProductoInterface[]>([]);

  const fetchProductos = useCallback(async () => {
    let data;
    setCargando(true);
    console.log(filters.category);
    if (filters.category === "all") {
      data = await getProductos();
      setProductos(data.slice(0, 20)); // Usar slice para evitar mutaciones.
      setCargando(false);
    } else {
      data = await getAllProductosByCategoria(filters.category);
      setProductos(data);
      setCargando(false);
    }
  }, [filters.category]); // Solo se recrea cuando cambia la categoría.

  // Filtrar productos en base al precio mínimo
  const filteredProducts = useMemo(() => {
    return productos.filter((producto) => producto.price >= filters.minPrice);
  }, [productos, filters.minPrice]); // Solo se recalcula si cambian `productos` o `filters.minPrice`.

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    const initializeData = async () => {
      // getProductos()
      //   .then((res) => setProductos(res.slice(0, 20)))
      //   .then(() => setCargando(false));
      getAllCategorias()
        .then((res) => setCategorias(res))
        .then(() => setCargando(false));
    };
    initializeData();
  }, []); // Se ejecuta solo al montar.

  // Llamar a fetchProductos cuando cambia la categoría
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <>

      <div className="filtro">
        <div className="filtro-content">

            <Filtro />
        </div>
          </div>
      {productos.length === 0 || cargando ? (
        <div className="loader"></div>
      ) : (
        <section className="productos-container">

          <ul className="productos">
            {filteredProducts.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default App;
