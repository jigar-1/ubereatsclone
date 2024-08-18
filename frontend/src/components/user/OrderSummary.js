import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../../redux';
import DishAddDel from './common/DishAddDel';

const OrderSummary = () => {
    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems;
    const dispatch = useDispatch()

    const handleRemove = (i) => {
        dispatch(deleteItem(i._id))
    }
    // console.log("cartITems:", cartItems)
    return (
        <div>
            {
                cartItems.map(i => {
                    return (<div key={i._id}>
                        <div className='cart-modal-items' >
                            <DishAddDel item={i} />
                            {/* <div className="col-2 quantity">{i.quantity}</div> */}
                            <div className="col-6">{i.name}</div>
                            <div className="col-2">$ {(i.price * i.quantity).toFixed(2)}</div>
                            <button className="col-1" onClick={() => handleRemove(i)} style={{ outline: 'none', cursor: 'pointer', border: 'none', backgroundColor: 'red', color: 'white', fontWeight: '700' }}>
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        <hr />
                    </div>
                    )
                })
            }

        </div>
    )
}

export default OrderSummary
