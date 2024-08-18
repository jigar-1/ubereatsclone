import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemToCart, modalToggle, removeItemFromCart, setNewOrderItem, setNewRest }
    from '../../../redux/user/Cart/CartActions';


const DishAddDel = (props) => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const cartItem = cartItems.find(
        i => i._id == props.item._id
    )
    const cart = useSelector(state => state.cart);
    const restData = useSelector(state => state.restGrid.restaurants);
    let { restId } = useParams();

    if (restId == undefined)
        restId = cart.currentRest.restId;

    console.log("rest", restId)
    const dispatch = useDispatch()


    const restName = restData.find(item => item._id == restId)?.name;


    const newRest = { restId, restName }
    const handleAddItem = async e => {
        // console.log("new Rest", newRest.restId)
        // console.log("current rest", cart.currentRest)
        dispatch(setNewRest(newRest))
        dispatch(setNewOrderItem(e.target.value))
        console.log("IDDDDD", restId)

        if (cart.currentRest.restId == undefined || cart.currentRest.restId == newRest.restId || cart.cartQuantity === 0) {
            dispatch(addItemToCart(e.target.value, newRest))
        }
        else {
            //show modal 
            dispatch(modalToggle(true))
        }

    }
    // }
    const handleDelItem = e => {
        console.log("EEE", e.target)
        dispatch(removeItemFromCart(e.target.value))
    }

    // console.log("Dish Add del props", props)
    let quantity = cartItem ? cartItem.quantity : 0;
    // console.log("P:", props.item._id)
    // console.log("ASD", cartItem)
    return (
        <div className="add-del-items" style={{ display: 'flex' }}>
            <button value={props.item._id} onClick={handleDelItem} >-</button>
            <input type='text' style={{ width: '50px', backgroundColor: 'white', color: 'black', textAlign: 'center' }} value={quantity} />
            <button value={props.item._id} onClick={handleAddItem} >+</button>
        </div>
    )
}

export default DishAddDel

