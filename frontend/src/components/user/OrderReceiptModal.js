import React from 'react'

const OrderReceiptModal = (props) => {


    if (!props.show) {
        return null
    }

    return (
        < div className="modal" onClick={props.onClose} >
            <div className="modal-content" onClick={e => e.stopPropagation}>
                <div className="modal-header">

                    <div>

                        <h6 className="modal-title">
                            Receipt
                        </h6>
                    </div>
                </div>
                <div className="modal-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4><b>Total</b></h4>
                        <h4><b>$ {(props.receipt.total).toFixed(2)}</b></h4>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >

                        <p><b>Quantity</b></p>
                        <p><b>Dish</b></p>
                        <p><b> Price </b></p>

                    </div>
                    {

                        props.receipt.orderItems.map(item => {
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} key={item.dishId} >

                                    <p> {item.dishQuantity}</p>
                                    <p>{item.dishName}</p>
                                    <p>$ {(item.itemPrice * item.dishQuantity).toFixed(2)}</p>



                                </div>
                            )
                        })

                    }
                    <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }} >

                        <p > <b>Added Note: </b> {props.receipt.orderNote ? props.receipt.orderNote : "None"}</p>

                    </div>




                </div>
                <div className="modal-footer">
                    <button className="modal-btn" onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div >
    )
}

export default OrderReceiptModal
