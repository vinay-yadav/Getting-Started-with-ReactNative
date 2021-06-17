import { fireBaseUrl } from "../../constants/Global";
import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(fireBaseUrl + 'products.json');

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }
                

            const respData = await response.json();

            const fetchedProducts = [];

            for (const key in respData) {
                fetchedProducts.push(new Product(
                    key,
                    respData[key].ownerId,
                    respData[key].title,
                    respData[key].imageUrl,
                    respData[key].description,
                    respData[key].price
                ))
            }


            dispatch({
                type: SET_PRODUCTS,
                products: fetchedProducts,
                userProducts: fetchedProducts.filter(prod => prod.ownerId === getState().auth.userId)
            })
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    }
}


export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const response = await fetch(fireBaseUrl + `products/${productId}.json?auth=${getState().auth.token}`, {
            method: 'DELETE'
        });

        if (!response.ok)
            throw new Error('Something went wrong in deleting item!!');

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const response = await fetch(fireBaseUrl + `products.json?auth=${getState().auth.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: getState().auth.userId
            })
        });

        const respData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: respData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: getState().auth.userId
            } // same as title: title...
        })
    }
}


export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(fireBaseUrl + `products/${id}.json?auth=${getState().auth.token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            if (!response.ok)
                throw new Error('Something went wrong in updating');

            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: { title, description, imageUrl }
            })
        } catch (err) {
            throw err;
        }
    }
}