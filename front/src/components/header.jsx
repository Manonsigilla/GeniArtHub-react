import { Link } from "react-router-dom";

function Header () {
    return (
        <header>
            <div className="row">
                <Link to="/">
                <img src="../logo-black.png" alt="Logo du site GeniArtHub" />
                </Link>
                <Link id="carticon" href="cart.jsx">
                    <img src="../cart.svg" alt="panier" />
                </Link>
            </div>
        </header>
    )
}

export default Header;