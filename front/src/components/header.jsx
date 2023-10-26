import { Link } from "react-router-dom";
import { useCart } from "./cartContext";

function Header () {

    const { state } = useCart();

    const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header>
            <div className="row">
                <Link to="/">
                <img src="../logo-black.png" alt="Logo du site GeniArtHub" />
                </Link>
                <Link id="carticon" to="/cart">
                    <img src="../cart.svg" alt="panier" />
                    {totalQuantity > 0 && (
                        <span>{totalQuantity}</span>
                    )}
                </Link>
            </div>
        </header>
    )
}

export default Header;