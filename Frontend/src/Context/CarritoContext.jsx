import { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cartItems]);

    const addItemToCart = (newItem) => {
        setCartItems((prevItems) => {
            console.log(newItem);
            console.log(prevItems);
            const existingItem = prevItems.find(item => item.id === newItem.id);
            console.log(existingItem);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...newItem, quantity: 1 }];
            }
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateCart = (updateFn) => {
        setCartItems(updateFn(cartItems));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CarritoContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, updateCart }}>
            {children}
        </CarritoContext.Provider>
    );
};
