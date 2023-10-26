import { useEffect, useState } from "react";
import { useCart } from "../components/cartContext";
import CartItem from "../components/cartItem";
import Header from "../components/header";
import Footer from "../components/footer";

const Cart = () => {
    const {state, dispatch} = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState({});
    const [orderId, setOrderId] = useState(null);


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
        // dispatch pour supprimer un produit du panier et afficher une alerte de confirmation
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
        alert("Le produit a bien été supprimé du panier");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(e)) {
            const formData = new FormData(e.target);
            const contact = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                address: formData.get("address"),
                city: formData.get("city"),
                email: formData.get("email")
            };

            const products = state.cart.map((item) => item._id);

            try {
                const response = await fetch ("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ contact, products }),
            });

                if (response.ok) {
                    const data = await response.json();
                    // on stocke le numéro de commande dans le state
                    setOrderId(data.orderId);
                    // on vide le panier
                    dispatch({ type: "EMPTY_CART" });
                    // on vide le formulaire
                    e.target.reset();
                    // on ouvre la modale
                    openModal();
                } else {
                    console.error("Retour du serveur :", response.status);
                    const errorData = await response.json();
                    console.error("Données de l'erreur :", errorData);
                    alert("Erreur lors de l'enregistrement de la commande");
                }
            } catch (error) {
                console.error("Erreur :", error);
                alert("Erreur lors de l'enregistrement de la commande");
            }
        }
    }

    const totalQuantity = state.cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <Header />
            <main>
            <section className="panier">
                <h1>Votre panier</h1>
                <hr />
                <div className="contenuPanier">
                {state.cart.length === 0 ? (
                    <p className="panierVide">Votre panier est vide, veuillez ajouter au moins un article.</p>
                ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="titre">Image</th>
                            <th className="titre">Titre</th>
                            <th className="titre">Format</th>
                            <th className="titre">Quantité</th>
                            <th className="titre">Prix du produit</th>
                            <th className="titre">Prix total du produit commandé</th>
                            <th className="titre">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} taille={item.taille} onRemove={handleRemove} dispatch={dispatch} />
                        ))}
                    </tbody>
                </table>
                )}
                </div>
                <div className="total">
                    <h2 className="titre">Total de la commande</h2>
                    <p>{totalQuantity} articles pour un total de {total.toFixed(2)} €</p>
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
                    <input type="text" name="firstName" id="prenom" />
                    {formError.prenom && <p className="error">{formError.prenom}</p>}
                    </div>
                    <div>
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" name="lastName" id="nom" />
                    {formError.nom && <p className="error">{formError.nom}</p>}
                    </div>
                    <div>
                    <label htmlFor="adresse">Adresse :</label>
                    <input type="text" name="address" id="adresse" />
                    {formError.adresse && <p className="error">{formError.adresse}</p>}
                    </div>
                    <div>
                    <label htmlFor="ville">Ville :</label>
                    <input type="text" name="city" id="ville" />
                    {formError.ville && <p className="error">{formError.ville}</p>}
                    </div>
                    <div>
                    <label htmlFor="email">Email :</label>
                    <input type="email" name="email" id="mail" />
                    {formError.mail && <p className="error">{formError.mail}</p>}
                    </div>
                    <div className="form-submit">
                        <input type="submit" id="submit-cart" value="Passer commande" />
                    </div>
                </div>
            </form>
        </section>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>Confirmation de commande</h2>
                    <p>Merci pour votre commande !</p>
                    <p>Votre numéro de commande est le <strong>{orderId}</strong></p>
                </div>
            </div>
        )}

        </main>
        <Footer />
    </>
    );
};

export default Cart;
