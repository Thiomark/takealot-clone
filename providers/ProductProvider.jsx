import React, { createContext, useState } from 'react'

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [list, setList] = useState([]);

    const fetchProduct = (product) => {
        setProduct(product);
    };

    const addItemToCart = (product) => {
        setCart(prev => [product, ...prev]);
    }

    const addItemToList = (product) => {
        
        setList(prev => [product, ...prev]);
    }

    const deleteFromCart = (id) => {
        setCart(prev => prev.filter(x => x.id !== id));
    }
    
    const deleteFromList = (id) => {
        setList(prev => prev.filter(x => x.id !== id));
    }

    return (
        <ProductContext.Provider value={{fetchProduct, deleteFromList, deleteFromCart, addItemToCart, addItemToList, product, cart, list}}>
            {children}
        </ProductContext.Provider>
    );
};