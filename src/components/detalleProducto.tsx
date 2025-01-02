import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "../services/products";
import { ProductoInterface } from "../models/producto";
import "./detalleProducto.css";
import { UseCart } from "../hooks/useCart";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

export function DetalleProducto() {
  const { addProductWithUnits } = UseCart();
  const { id } = useParams();
  const [producto, setProducto] = useState<ProductoInterface | null>(null);
  const [cargado, setCargado] = useState(false);
  const unidades = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getProductoById(Number(id))
      .then((producto) => setProducto(producto))
      .then(() => {
        setCargado(true);
      });
  }, [id]);

  const handleAddCart = () => {
    if (unidades.current && producto) {
      addProductWithUnits(producto, parseInt(unidades.current.value));
      enqueueSnackbar("Producto añadido correctamente", {
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
  };
  function back() {
    window.history.back();
  }
  return (
    <div>
      {producto && cargado ? (
        <>
          <p className="back" onClick={back}>
            <span className="material-symbols-outlined">arrow_back</span> <span>Volver</span>
          </p>
          <div className="detalle-producto">
            <div className="imagen-container">
              <img
                src={producto.image}
                alt={producto.title}
                className="imagen-detalle"
              />
            </div>
            <div className="info-container">
              <h1>{producto.title}</h1>
              <p>{producto.description}</p>
              <p><strong>{producto.price}€</strong></p>

              <label htmlFor="unidades">Unidades:</label>
              <input
                type="number"
                id="unidades"
                min={1}
                ref={unidades}
                defaultValue={1}
              />
              <button onClick={handleAddCart}>Añadir al carrito</button>
            </div>
          </div>
        </>
      ) : (
        <div className="loader"></div>
      )}

      <SnackbarProvider />
    </div>
  );
}
