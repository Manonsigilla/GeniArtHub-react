import { Link } from "react-router-dom";
import Shop from "../components/aiartshop";
import Footer from "../components/footer";
import "../styles/style.css"

function Home () {
    document.body.classList.remove("page")

    return (
        <>
        <header>
            <div className="row">
                <Link to="/">
                <img src="../logo-white.png" alt="Logo du site GeniArtHub" />
                </Link>
            </div>
        </header>
        <Shop />
        <Footer />
        </>
    )
}

export default Home;