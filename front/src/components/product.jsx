import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Product = ({ productData }) => {
    return (
        <>
        <img src={productData.image} alt={productData.titre} />
        <Link to={`/product/${productData._id}`} >Buy {productData.shorttitle}</Link>
        </>
    );
};

Product.propTypes = {
    productData: PropTypes.shape({
        shorttitle: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        titre: PropTypes.string.isRequired,
    }).isRequired
};
  
export default Product;