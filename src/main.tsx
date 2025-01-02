import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FiltersProvider } from "./contexts/filterContext.tsx";
import { CartProvider } from "./contexts/cartContext.tsx";
import "@fontsource-variable/onest";
import { BrowserRouter, Link } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.tsx";
import { Cart } from "./components/cart.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FiltersProvider>
      <CartProvider>
        <BrowserRouter>
            <Cart />
          <header>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <h1 className="nombre-tienda">Tienda</h1>
            </Link>
          </header>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </FiltersProvider>
  </StrictMode>
);
