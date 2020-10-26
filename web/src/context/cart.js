import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [ cart, setCart] = useState([]);
    const [ totalValue, setTotalValue ] = useState();
    const [ freteValue, setFreteValue ] = useState(5);

    useEffect(() => {
        let value = 0;
        cart.map(item => {
            return value = value + item.price;
        });
        value = value.toFixed(2)
        setTotalValue(value);
        setFreteValue(5);
    }, [cart])

    useEffect(() => {
        const c = JSON.parse(localStorage.getItem('cart'));
        setCart([...c]);
    }, [])

    function add(item) {
        const newCart = cart;
        newCart.push(item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart([...newCart]);
    }

    function remove(index) {
        const newCart = cart.filter((item, i) => i !== index);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart([...newCart]);
    }

    const store = {
        cart,
        totalValue,
        add,
        remove,
        freteValue
    }

    return (
        <CartContext.Provider value={store}>
            { children }
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    const {
        cart,
        totalValue,
        add, 
        remove,
        freteValue
    } = context;

    return {
        cart,
        totalValue,
        add,
        remove,
        freteValue
    }
}

