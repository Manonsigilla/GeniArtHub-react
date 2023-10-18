import PropTypes from 'prop-types';



const CartItem = ({ item, onRemove }) => {

    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;

    return (
        <tr>
            <td>
            <img className='image' src={item.image} alt={item.titre} />
            </td>
            <td>{item.titre}</td>
            <td>{quantity}</td>
            <td>{item.prix} €</td>
            <td>{(item.prix * item.quantity).toFixed(2)} €</td>
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
        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
        prix: PropTypes.number.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartItem;