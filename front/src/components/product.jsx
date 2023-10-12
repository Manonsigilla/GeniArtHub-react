import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Product = ({ productData }) => {
    return (
        <div className="product">
            <Link to={`/product/${productData._id}`}>
                <img src={productData.image} alt={productData.titre} />
            </Link>
        </div>
    );
};

Product.propTypes = {
    productData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        titre: PropTypes.string.isRequired,
    }).isRequired
};
  
export default Product;