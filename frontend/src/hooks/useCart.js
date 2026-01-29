import { useSelector } from 'react-redux';

/**
 * Custom hook for accessing cart state
 */
const useCart = () => {
    const { items, loading, error } = useSelector((state) => state.cart || { items: [], loading: false, error: null });

    // Calculate total items
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate total price
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
        items,
        loading,
        error,
        totalItems,
        totalPrice,
        isEmpty: items.length === 0,
    };
};

export default useCart;
