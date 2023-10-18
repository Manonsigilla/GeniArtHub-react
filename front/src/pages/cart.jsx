import { useEffect } from "react";
import { useCart } from "../components/cartContext";
import CartItem from "../components/cartItem";
import Header from "../components/header";
import Footer from "../components/footer";

const Cart = () => {
    const {state, dispatch} = useCart();
    
    useEffect(() => {
        const total = state.cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);
        
        // dispatch pour mettre à jour le total du panier
        dispatch({ type: "UPDATE_TOTAL", payload: total });
    }, [state.cart, dispatch]);

    const handleRemove = (item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    }

    const total = state.total || 0;

    return (
        <>
            <Header />
            <main>
            <section className="panier">
                <h1>Votre panier</h1>
                <hr />
                <div className="contenuPanier">
                <table>
                    <thead>
                        <tr>
                            <th className="titre">Image</th>
                            <th className="titre">Titre</th>
                            <th className="titre">Quantité</th>
                            <th className="titre">Prix du produit</th>
                            <th className="titre">Prix total du produit commandé</th>
                            <th className="titre">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} onRemove={handleRemove} />
                    ))}
                    </tbody>
                </table>
                </div>
                <div className="total">
                    <h2 className="titre">Total de la commande</h2>
                    <p>{total.toFixed(2)} €</p>
                </div>
                <hr />
            </section>
        {/* ... (le reste de votre formulaire de commande) */}
        </main>
        <Footer />
    </>
    );
};

export default Cart;
