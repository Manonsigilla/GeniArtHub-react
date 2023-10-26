import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/style.css"
import { useParams } from "react-router-dom";
import { useCart } from "../components/cartContext";

const ProductDescription = () => {
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const { id } = useParams();
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isLimitExceeded, setIsLimitExceeded] = useState(false);

    document.body.classList.add("page")

    
    useEffect(() => {
        
        // Effectuez un appel réseau pour récupérer les données du produit en utilisant l'ID
        fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setProductData(data);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données : " + error);
        });
    }, [id]);
    
    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);

        if (newSize && productData) {
            const selectedDeclinaison = productData.declinaisons.find(
                (declinaison) => declinaison.taille === newSize
            );
            if (selectedDeclinaison) {
                setSelectedQuantity(selectedDeclinaison.quantity || selectedQuantity);
            }
        } else {
            setSelectedQuantity(1); // Remettez la quantité à 1 si aucune taille n'est sélectionnée
        }
    };

    const getPriceForSelectedSize = () => {
        if (selectedSize) {
            const selectedDeclinaison = productData.declinaisons.find(
                (declinaison) => declinaison.taille === selectedSize
            );
            if (selectedDeclinaison) {
                return selectedDeclinaison.prix;
            }
        }
        return null;
    };

    const priceForSelectedSize = getPriceForSelectedSize();


    const handleAddToCart = (e) => {
        e.preventDefault();
        if (selectedSize) {
            const selectedProduct = productData.declinaisons.find(
                (declinaison) => declinaison.taille === selectedSize
            );
            if (selectedProduct) {
                const newTotalQuantity = totalQuantity + selectedQuantity;
                if (newTotalQuantity <= 100) {
                    addToCart({ ...productData, prix: selectedProduct.prix, taille: selectedSize }, selectedQuantity);
                    setTotalQuantity(newTotalQuantity);
                    setIsModalOpen(true);
                } else {
                    setIsLimitExceeded(true);
                }
            }
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const closeLimitExceededModal = () => {
        setIsLimitExceeded(false);
    }


    return !productData ? <div>Loading...</div> : (
        <>
        <Header />
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>Le produit a bien été ajouté au panier</p>
                </div>
            </div>
        )}
        {isLimitExceeded && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeLimitExceededModal}>&times;</span>
                    <p>Vous ne pouvez pas ajouter plus de 100 produits au panier</p>
                </div>
            </div>
        )}
        <div className="product-description">
        <section className="detailoeuvre">
            <article>
            <figure>
                <img src={productData.image} alt={productData.titre} />
            </figure>
            <div>
                <h1>{productData.titre}</h1>
                <p>{productData?.description?.substring(0, 200) + "..."}</p>
                <div className="price">
                <p>Acheter pour</p>
                <span className="showprice">{priceForSelectedSize !== null ? `${priceForSelectedSize}` : productData.declinaisons[0].prix}€</span>
                </div>
                <div className="declinaison">
                <input 
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="1"
                    value={selectedQuantity}
                    min="1"
                    max="100"
                    onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
                />
                <select name="format" id="format" onChange={handleSizeChange}>
                    {productData.declinaisons.map((declinaison, index) => (
                    <option key={index} value={declinaison.taille}>
                        {declinaison.taille} - {declinaison.prix} €
                    </option>
                    ))}
                </select>
                </div>
                <Link className="button-buy" to="#" onClick={handleAddToCart}>
                Buy {productData.shorttitle}
                </Link>
            </div>
            </article>
            <aside>
                <h2>Information sur l&apos;oeuvre</h2>
                <p>{productData.description}</p>
            </aside>
        </section>
        </div>
        <Footer />
        </>
    );
};

export default ProductDescription;