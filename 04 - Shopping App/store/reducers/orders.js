import OrderItem from "../../models/orderItem";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
    orders: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new OrderItem(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

        case SET_ORDERS:
            return {
                orders: action.orders
            }

        default:
            return state;

    }
}