import { useEffect, useId, useRef } from "react";
import "./cart.css";
import { UseCart } from "../hooks/useCart";
import { ProductoInterface } from "../models/producto";
export function Cart() {
  const CartCheckboxId = useId();
  const { cart, addProduct, removeProduct } = UseCart();
  const checkboxRef = useRef<HTMLInputElement>(null);
  function removeProductCart(producto: ProductoInterface) {
    removeProduct(producto);
  }
  function addProductCart(producto: ProductoInterface) {
    addProduct(producto);
  }
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <label htmlFor={CartCheckboxId} className="cart-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="#F5F5F5"
        >
          <path d="M528.1 301.3l47.3-208C578.8 78.3 567.4 64 552 64H159.2l-9.2-44.8C147.8 8 137.9 0 126.5 0H24C10.7 0 0 10.7 0 24v16c0 13.3 10.7 24 24 24h69.9l70.2 343.4C147.3 417.1 136 435.2 136 456c0 30.9 25.1 56 56 56s56-25.1 56-56c0-15.7-6.4-29.8-16.8-40h209.6C430.4 426.2 424 440.3 424 456c0 30.9 25.1 56 56 56s56-25.1 56-56c0-22.2-12.9-41.3-31.6-50.4l5.5-24.3c3.4-15-8-29.3-23.4-29.3H218.1l-6.5-32h293.1c11.2 0 20.9-7.8 23.4-18.7z" />
        </svg>
        <span className="items-cart">{cart.length}</span>
      </label>
      <input type="checkbox" id={CartCheckboxId} hidden ref={checkboxRef} />
      <aside className="cart">
        <button
          className="close-cart"
          onClick={() => {
            if (checkboxRef.current) checkboxRef.current.checked = false;
          }}
        >
<span className="material-symbols-outlined">close</span>
        </button>
        <ul>
          {cart.map((item) => (
            <li className="cart-item" key={item.product.id}>
              <img src={item.product.image} alt={item.product.title} />
              <div>
                <strong>{item.product.title}</strong> - {item.product.price}€
              </div>
              <footer>
                <button onClick={() => removeProductCart(item.product)}>
                  -
                </button>{" "}
                {item.quantity}{" "}
                <button onClick={() => addProductCart(item.product)}>+</button>
              </footer>
            </li>
          ))}
          {cart.length === 0 && <li>No hay productos en el carrito</li>}
        </ul>
      </aside>
    </>
  );
}
