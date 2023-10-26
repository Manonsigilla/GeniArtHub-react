import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Product from "./product";
import { useCart } from "./cartContext";

function Shop () {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products/")
        .then((response) => response.json())
        .then((data) => {
            setProductsData(data)
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données de l'API :", error)
        })
    }, [])

    const { state } = useCart();

    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <section className="hero">
                <div className="row">
                    <h1>Explorez l&apos;AI-magination artistique</h1>
                    <Link to="#aiartshop">AI Art Shop</Link>
                </div>
            </section>
            <section id="aiartshop" className="productlist">
                <div>
                    <img src="../logo-black.png" alt="Logo GeniArtHub version sombre" />
                    <Link id="carticon" to="/cart">
                        <img src="../cart.svg" alt="panier" />
                        {totalQuantity > 0 && (
                            <span>{totalQuantity}</span>
                        )}
                    </Link>
                </div>
                <section className="products">
                    {productsData.map((product) => (
                        <article className="ficheProduct" key={product._id}>
                                <Product key={product._id} productData={product} />
                        </article>
                    ))}
                </section>
            </section>
        </>
    )
}

export default Shop