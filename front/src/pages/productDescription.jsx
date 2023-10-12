import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/style.css"
import { useParams } from "react-router-dom";
import { useCart } from "../components/cartContext";

const ProductDescription = () => {
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const { addToCart } = useCart();

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
        setSelectedSize(e.target.value);
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


    const handleAddToCart = () => {
        if (selectedSize) {
            const selectedProduct = productData.declinaisons.find(
                (declinaison) => declinaison.taille === selectedSize
            );
            if (selectedProduct) {
                addToCart(productData, selectedProduct.quantity);
            }
        }
    }


    return !productData ? <div>Loading...</div> : (
        <>
        <Header />
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
                <span className="showprice">{priceForSelectedSize !== null ? `${priceForSelectedSize} €` : "Sélectionnez une taille"}</span>
                </div>
                <div className="declinaison">
                <input 
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="1"
                    value={quantity}
                    min="1"
                    max="100"
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
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
                <p>Artiste : {productData.shorttitle}</p>
                <p>Dimensions : {productData.declinaisons[0].taille}</p>
            </aside>
        </section>
        </div>
        <Footer />
        </>
    );
};

export default ProductDescription;