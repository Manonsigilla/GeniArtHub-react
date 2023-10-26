import PropTypes from 'prop-types';



const CartItem = ({ item, onRemove, dispatch }) => {

    const maxQuantity = 100;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    // fonction qui permet de changer la quantité d'un produit dans le panier à partir de l'input quantité
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if(!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= maxQuantity) {
            // dispatch pour mettre à jour la quantité du produit dans le panier
            dispatch({ 
                type: "UPDATE_QUANTITY", 
                payload: { _id: item._id, quantity: newQuantity } 
            });
        } else {
            alert('La quantité doit être un nombre compris entre 0 et 100');
            dispatch({ 
                type: "UPDATE_QUANTITY", 
                payload: { _id: item._id, quantity: maxQuantity } 
            });
        }
    };


    return (
        <tr>
            <td>
                <img className='image' src={item.image} alt={item.titre} />
            </td>
            <td>{item.titre}</td>
            <td>
                <input type="number" name="quantity" id="quantity" value={quantity} max={maxQuantity} className='quantite' onChange={handleQuantityChange} />
            </td>
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
        _id: PropTypes.string.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default CartItem;