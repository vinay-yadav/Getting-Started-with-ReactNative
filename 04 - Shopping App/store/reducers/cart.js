import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_ITEM } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

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

        case REMOVE_ITEM:
            const currentQuanity = state.items[action.pid].quantity;

            let updatedCartItems;
            if (currentQuanity > 1) {
                // reduce it
                const updatedCartItem = new CartItem(
                    state.items[action.pid].quantity - 1,
                    state.items[action.pid].productPrice,
                    state.items[action.pid].productTitle,
                    state.items[action.pid].sum - state.items[action.pid].productPrice
                );

                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };

            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - state.items[action.pid].productPrice
            }

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state
            }

            const updatedItems = { ...state.items };
            const updatedTotal = updatedItems[action.pid].sum;
            delete updatedItems[action.pid];

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - updatedTotal
            }

        default:
            return state;
    }
}

export default reducer;