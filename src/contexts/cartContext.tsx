import { createContext, useState } from "react";
import { ProductoInterface } from "../models/producto";


interface CartContextType {
    cart: {
        product: ProductoInterface;
        quantity: number;
    }[];
    setCart: React.Dispatch<React.SetStateAction<{
        product: ProductoInterface;
        quantity: number;
      }[]>>;
}

const defaultCartContext: CartContextType = {
    cart: [],
    setCart: () => {}
}
export const CartContext = createContext<CartContextType>(defaultCartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
      const [cart, setCart] = useState(defaultCartContext.cart);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}