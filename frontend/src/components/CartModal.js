import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import OrderSummary from './user/OrderSummary';

const CartModal = (props) => {
    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems;

    console.log("cartITems:", cartItems)

    if (!props.show) {
        return null
    }


    let total = cartItems.reduce((sum, j) => sum + (j.price * j.quantity), 0)

    return (
        // <div>
        //     {redirectVar}
        < div className="modal" >

            <div className="modal-content" onClick={e => e.stopPropagation}>
                <div className="modal-header">

                    <div onClick={props.onClose}>
                        <h2 className="modal-title">
                            Restaurant Name
                        </h2>
                    </div>
                </div>
                <div className="modal-body" style={{ overflow: "scroll" }}>
                    <div className='cart-btns' >
                        <button>Add Items</button>
                        <button>Group Order</button>

                    </div>
                    <OrderSummary cart="cart-sm" />



                </div>
                <div className="modal-footer">
                    <Link to='/PlaceOrder' >
                        <button className="modal-btn" onClick={props.onClose}>
                            Go To Checkout $ {total.toFixed(2)}
                        </button>
                    </Link>
                </div>
            </div>
        </div >
        // </div>
    )
}

export default CartModal
