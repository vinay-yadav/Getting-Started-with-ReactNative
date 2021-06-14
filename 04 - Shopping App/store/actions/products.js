export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    console.log('createProduct');
    return {
        type: CREATE_PRODUCT,
        productData: { title, description, imageUrl, price } // same as title: title...
    }
}


export const updateProduct = (id, title, description, imageUrl) => {
    console.log('updateProduct');
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: { title, description, imageUrl }
    }
}