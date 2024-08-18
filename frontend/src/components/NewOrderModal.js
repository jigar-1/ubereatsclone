import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addItemToCart, clearCart, modalToggle } from '../redux';

const NewOrderModal = () => {
    const cart = useSelector(state => state.cart)
    // const modal = cart.modal;
    console.log("new order :", cart.modal)
    const dispatch = useDispatch()
    const noAction = () => {
        dispatch(modalToggle(false));
    }
    const handleNewOrder = () => {
        console.log("handlenew order")
        dispatch(clearCart())
        dispatch(addItemToCart(cart.newOrderItem, cart.newRest))
    }


    if (!cart.modal)
        return null
    return (
        < div className="modal" show={cart.modal} onClick={noAction}  >
            <div className="modal-content" style={{ height: '300px' }} onClick={e => e.stopPropagation}>
                <div className="modal-header">

                    <div><h2 className="modal-title">
                        Create New Order?
                    </h2>
                    </div>
                </div>
                <div className="modal-body">
                    Your order contains items from <b>{cart.currentRest.restName}</b>.
                    <br />
                    Do you want to create a new order to add items from <b>{cart.newRest.restName}</b>?
                </div>
                <div className="modal-footer">
                    <button className="modal-btn" onClick={handleNewOrder}>
                        New Order
                    </button>
                </div>
            </div>
        </div >
    )
}

export default NewOrderModal
