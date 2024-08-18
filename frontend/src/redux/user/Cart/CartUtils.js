
export const addItemUtil = (cartItems, newItem) => {
    const existingCart = cartItems.find(
        item => item._id === newItem._id
    )


    if (existingCart) {
        return cartItems.map(item =>
            item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
        )
    }

    return [...cartItems, { ...newItem, quantity: 1 }]

}

export const delItemUtil = (cartItems, removeItem) => {

    const existingCart = cartItems.find(
        item => item._id == removeItem
    )

    if (existingCart && existingCart.quantity == 1) {
        return cartItems.filter(item => item._id != removeItem);
    }

    return cartItems.map(item =>
        item._id == removeItem
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );

    // console.log("remove", remove)


}

export const delFullItem = (cartItems, removeItem) => {

    const existingCart = cartItems.find(
        item => item._id == removeItem
    )

    if (existingCart) {
        return cartItems.filter(item => item._id != removeItem);
    }

    // return cartItems.map(item =>
    //     item.id == removeItem
    //         ? { ...item, quantity: item.quantity - 1 }
    //         : item
    // );

    // console.log("remove", remove)


}
export const count = (cartItems, cartQuantity, removeItem) => {

    const existingCart = cartItems.find(
        item => item._id == removeItem
    )

    if (existingCart) {
        return existingCart.quantity;
    }



}

export const checkCurrent = (currentRest, newRest, modal) => {

    // console.log('in util', newRest);
    // console.log('in util', currentRest);
    if (currentRest) {
        if (currentRest.restId != newRest.restId)
            modal = true;
    }
    else
        return { ...currentRest, ...newRest }


}