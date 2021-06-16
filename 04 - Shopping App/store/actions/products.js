import { fireBaseUrl } from "../../constants/Global";
import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(fireBaseUrl + 'products.json');

            if (!response.ok)
                throw new Error('Something went wrong!!');

            const respData = await response.json();

            const fetchedProducts = [];

            for (const key in respData) {
                fetchedProducts.push(new Product(
                    key,
                    'u1',
                    respData[key].title,
                    respData[key].imageUrl,
                    respData[key].description,
                    respData[key].price
                ))
            }


            dispatch({
                type: SET_PRODUCTS,
                products: fetchedProducts
            })
        } catch (err) {
            // send to custom analytics server
            throw err;
        }
    }
}


export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(fireBaseUrl + `products/${productId}.json`, {
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
    return async dispatch => {
        const response = await fetch(fireBaseUrl + 'products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
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
                price
            } // same as title: title...
        })
    }
}


export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        try {
            const response = await fetch(fireBaseUrl + `products/${id}.json`, {
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