import { createContext, useEffect, useReducer } from "react";
export const cartItemContext = createContext(null);
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, {...action.payload.item,qty:1}]
        case "REMOVE_FROM_CART":
            const newState = state.filter(item => item.id !== action.payload.id);
            return newState;
        case "INC_QTY_BY_1":
            return state.map(item =>
                item.id === action.payload.id 
                    ? { ...item, qty: item.qty + 1 } // Create a new object with the updated qty
                    : item
            );
        case "DEC_QTY_BY_1":
            return state
                .map(item =>
                    item.id === action.payload.id 
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0);
        default:
            return state;

    }
};
export const CartContext = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    const addToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: { item } })
    }
    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    };
    const incQty=(id)=>{
        dispatch({type:"INC_QTY_BY_1",payload:{id}})
    }
    const decQty=(id)=>{
        dispatch({type:"DEC_QTY_BY_1",payload:{id}})
    }
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    return (
        <>
            <cartItemContext.Provider value={{ cart, addToCart, removeFromCart,incQty,decQty}}>
                {children}
            </cartItemContext.Provider>
        </>
    )
}


