import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove }) => {
    return (
        <tr>
            <td>
            <img className='image' src={item.image} alt={item.titre} />
            </td>
            <td>{item.titre}</td>
            <td>{item.quantity}</td>
            <td>{item.prix} €</td>
            <td>{item.prix * item.quantity} €</td>
            <td>
            <button onClick={() => onRemove(item)}>Supprimer</button>
            </td>
        </tr>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        titre: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        prix: PropTypes.number.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartItem;