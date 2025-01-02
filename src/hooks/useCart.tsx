import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { ProductoInterface } from "../models/producto";

export function UseCart(){
    const {cart, setCart} = useContext(CartContext);

    function addProduct(product: ProductoInterface) {
        setCart((prevCart) => {
            const item = prevCart.find((item) => item.product.id === product.id);
            if (item) {
                return prevCart.map((cartItem) =>
                    cartItem.product.id === product.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    }

    function addProductWithUnits(product: ProductoInterface, units: number) {
        setCart((prevCart) => {
            const item = prevCart.find((item) => item.product.id === product.id);
            if (item) {
                return prevCart.map((cartItem) =>
                    cartItem.product.id === product.id
                        ? { ...cartItem, quantity: cartItem.quantity + units }
                        : cartItem
                );
            } else {
                return [...prevCart, { product, quantity: units }];
            }
        });
    }

    function removeProduct(product:ProductoInterface){
        let newCart = [...cart];
        const item = newCart.find((item) => item.product.id === product.id);
        if(item){
            item.quantity--;
            if(item.quantity == 0){
                newCart = newCart.filter((item) => item.product.id !== product.id);
            }
        }
        setCart(newCart);
    }
    function deleteProduct(product:ProductoInterface){
        const newCart = [...cart];
        const newCartFiltered = newCart.filter((item) => item.product.id !== product.id);
        setCart(newCartFiltered);
    }
    return {cart, addProduct, removeProduct, deleteProduct, addProductWithUnits}
}