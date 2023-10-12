import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
    cart: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
        return {
            ...state,
            cart: [...state.cart, action.payload],
        };
        case 'UPDATE_QUANTITY':
        return {
            ...state,
            cart: state.cart.map((item) => {
            if (item._id === action.payload._id) {
                return { ...item, quantity: action.payload.quantity };
            }
            return item;
            }),
        };
        case 'REMOVE_FROM_CART':
        return {
            ...state,
            cart: state.cart.filter((item) => item._id !== action.payload._id),
        };
        default:
        return state;
    }
};

export function useCart () {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product, quantity) => {
    // Vérifiez si le produit est déjà dans le panier
    const existingItem = state.cart.find((item) => item._id === product._id);
        if (existingItem) {
        // Si le produit existe déjà, mettez à jour la quantité
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { _id: product._id, quantity },
        });
        } else {
        // Sinon, ajoutez le produit au panier
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity },
        });
        }
    };

    return (
        <CartContext.Provider value={{ state, dispatch, addToCart }}>
        {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
