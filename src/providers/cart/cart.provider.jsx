import React, {createContext, useState, useEffect} from 'react';
import {
    addItemToCart, 
    removeItemFromCart, 
    filterItemFromCart,
    getCartItemsCount,
    getCartItemsTotalCount
    } from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems:[],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartItemsCountTotal: 0
});

const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartItemsCountTotal, setcartItemsCountTotal] = useState(0);

    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item))

    useEffect(()=>{
        setCartItemsCount(getCartItemsCount(cartItems));
    },[cartItems])

    useEffect(()=>{
        setcartItemsCountTotal(getCartItemsTotalCount(cartItems));
    }, [cartItems])

return <CartContext.Provider 
    value={{
        hidden,
        toggleHidden, 
        cartItems, 
        addItem, 
        cartItemsCount, 
        removeItem,
        clearItemFromCart,
        cartItemsCountTotal
        }}>

         {children}
    </CartContext.Provider>
};
export default CartProvider