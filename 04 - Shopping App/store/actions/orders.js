import { fireBaseUrl } from '../../constants/Global';
import OrderItem from '../../models/orderItem';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const response = await fetch(fireBaseUrl + 'orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: new Date().toISOString()
            })
        });

        const respData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: respData.name,
                items: cartItems,
                amount: totalAmount,
                date: new Date().toISOString()
            }
        });
    }
}


export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch(fireBaseUrl + 'orders/u1.json');

            if (!response.ok)
                throw new Error('Error in fetching orders!!!')

            const respData = await response.json();

            const fetchedOrders = [];

            for (const key in respData) {
                fetchedOrders.push(new OrderItem(
                    key,
                    respData[key].cartItems,
                    respData[key].totalAmount,
                    new Date(respData[key].date)
                ))
            }

            dispatch({
                type: SET_ORDERS,
                orders: fetchedOrders
            })
        } catch (error) {
            throw error;
        }
    }
}