import { ProductoInterface } from "../models/producto";
import "./producto.css";
import { UseCart } from "../hooks/useCart";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { Link } from "react-router-dom";
export function Producto({ producto }: { producto: ProductoInterface }) {
  const { addProduct } = UseCart();
    const imagen = producto.image
    const imagenMostrar = !(imagen.includes("placeimg")|| imagen.includes("pravatar")) ? imagen : 'https://join.travelmanagers.com.au/wp-content/uploads/2017/09/default-placeholder-300x300.png';
  
    function addProductCart(event: React.MouseEvent<HTMLButtonElement>, producto: ProductoInterface){
      event.preventDefault();
      addProduct(producto);
      enqueueSnackbar('Producto añadido correctamente', {
        autoHideDuration: 2000,
        anchorOrigin :{horizontal: "center", vertical: "top" }
      })
    }
  
    return (
      <>
    <li className="producto">
    <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' , textAlign: 'center'}}>
      <img src={imagenMostrar} alt={producto.title} />
      <h4>{producto.title}</h4>
      <div className="producto-precio">
        <p>{producto.price}€</p>
        <button onClick={(event) => addProductCart(event, producto)}>Añadir al carrito</button>
      </div>
      </Link>
    </li>
    <SnackbarProvider />
    </>
  );
}
