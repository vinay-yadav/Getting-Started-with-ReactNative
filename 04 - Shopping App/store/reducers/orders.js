import OrderItem from "../../models/orderItem";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    orders: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new OrderItem(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date()
            );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state;

    }
}