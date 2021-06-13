import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
    items: {},
    totalAmount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                // already have item in cart
                const existedItem = state.items[addedProduct.id];

                updatedOrNewCartItem = new CartItem(
                    existedItem.quantity + 1,
                    prodPrice,
                    prodTitle,
                    existedItem.sum + prodPrice
                )
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem
                },
                totalAmount: state.totalAmount + prodPrice
            }
        default:
            return state;
    }
}

export default reducer;