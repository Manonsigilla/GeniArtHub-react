import { useEffect, useState } from "react";
import { useCart } from "../components/cartContext";
import CartItem from "../components/cartItem";
import Header from "../components/header";
import Footer from "../components/footer";

const Cart = () => {
    const {state, dispatch} = useCart();
    const [orderNumber, setOrderNumber] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState({});

    const generateOrderNumber = () => {
        // générer un nombre aléatoire entre 1 et 10000 pour simuler un numéro de commande
        return Math.floor(Math.random() * 10000) + 1;
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    useEffect(() => {
        const total = state.cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);
        
        // dispatch pour mettre à jour le total du panier
        dispatch({ type: "UPDATE_TOTAL", payload: total });
    }, [state.cart, dispatch]);

    const handleRemove = (item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    }

    const total = state.total || 0;

    const validateForm = (e) => {
        e.preventDefault();

        const errors = {};
        const { mail, prenom, nom, adresse, ville } = e.target.elements;
        if (!mail || !mail.value.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i)) {
            errors.email = "L'email est invalide";
        }
        if (!prenom || !prenom.value.match(/^[a-zàâçéèêëîïôûùüÿñæœ .-]+$/i)) {
            errors.prenom = "Le prénom est invalide";
        }
        if (!nom || !nom.value.match(/^[a-zàâçéèêëîïôûùüÿñæœ .-]+$/i)) {
            errors.nom = "Le nom est invalide";
        }
        if (!adresse || !adresse.value.match(/^[a-z0-9àâçéèêëîïôûùüÿñæœ .-]+$/i)) {
            errors.adresse = "L'adresse est invalide";
        }
        if (!ville || !ville.value.match(/^[a-zàâçéèêëîïôûùüÿñæœ .-]+$/i)) {
            errors.ville = "La ville est invalide";
        }
        // on retoune true si le formulaire est valide, sinon false
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return false;
        } else {
            setFormError({});
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm(e)) {
            // Générer un numéro de commande
            const orderNumber = generateOrderNumber();
            // Mettre à jour le state pour afficher le numéro de commande
            setOrderNumber(orderNumber);
            // Vider le panier
            dispatch({ type: "EMPTY_CART" });
            // Vider le formulaire
            e.target.reset();
            // Afficher la modale
            openModal();
        }
    }

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
                        <CartItem key={item._id} item={item} onRemove={handleRemove} dispatch={dispatch} />
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
            <section className="formulaireDeCommande detailoeuvre">
            <h2>Formulaire de commande</h2>
            <hr />
            <form action="#" method="post" onSubmit={handleSubmit}>
                <div className="form-container">
                    <div>
                    <label htmlFor="prenom">Prénom :</label>
                    <input type="text" name="prenom" id="prenom" />
                    {formError.prenom && <p className="error">{formError.prenom}</p>}
                    </div>
                    <div>
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" name="nom" id="nom" />
                    {formError.nom && <p className="error">{formError.nom}</p>}
                    </div>
                    <div>
                    <label htmlFor="adresse">Adresse :</label>
                    <input type="text" name="adresse" id="adresse" />
                    {formError.adresse && <p className="error">{formError.adresse}</p>}
                    </div>
                    <div>
                    <label htmlFor="ville">Ville :</label>
                    <input type="text" name="ville" id="ville" />
                    {formError.ville && <p className="error">{formError.ville}</p>}
                    </div>
                    <div>
                    <label htmlFor="email">Email :</label>
                    <input type="email" name="mail" id="mail" />
                    {formError.mail && <p className="error">{formError.mail}</p>}
                    </div>
                    <div className="form-submit">
                        <input type="submit" id="submit-cart" value="Passer commande" />
                    </div>
                </div>
            </form>
        </section>
        {/* Modale de confirmation de commande */}
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Confirmation de commande</h2>
                    <p>Merci pour votre commande !</p>
                    <p>Votre numéro de commande est le <strong>{orderNumber}</strong></p>
                </div>
            </div>
        )}

        </main>
        <Footer />
    </>
    );
};

export default Cart;
