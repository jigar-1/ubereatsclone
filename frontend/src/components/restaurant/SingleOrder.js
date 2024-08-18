import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../../utils/constants';

let delivery = [
    { label: "Order Received", value: "Order Received" },
    { label: "Preparing", value: "Preparing" },
    { label: "On the Way", value: "On the Way" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancel", value: "Cancelled" }
]
let pickup = [
    { label: "Order Received", value: "Order Received" },
    { label: "Preparing", value: "Preparing" },
    { label: "Pick Up Ready", value: "Pick Up Ready" },
    { label: "Picked Up", value: "Picked Up" },
    { label: "Cancel", value: "Cancelled" }

]
const SingleOrder = (props) => {
    const { item, onCustNameClick } = props;
    const [status, setStatus] = useState()


    console.log("PP", props);
    useEffect(() => {
        setStatus(item.orderStatus)
    }, [item.orderStatus])

    const handleOrderStatusChange = (e) => {
        console.log("status selected:", e.target.value)
        setStatus(e.target.value)
    }

    const handleOrderStatusUpdate = async (e) => {

        console.log("ORDER ID", item._id)
        console.log("STATUS", status)

        axios
            .put(`${API_BASE_URL}/orders/${item._id}`, { status: status, filter: item.orderFilter })
            .then(res => {
                console.log(res.data)

            })
            .catch(err => {
                console.log("ERROR:", err)
            })
    }

    let updater = null;
    if (props.item.orderStatus !== "Cancelled") {
        updater = (
            <div style={{ textAlign: 'center' }}>

                <p>Change Order Status</p>
                <select
                    style={{
                        width: '200px', height: '50px', color: 'white',
                        backgroundColor: 'black', fontWeight: '500', outline: 'none', border: 'none'
                    }}
                    onChange={handleOrderStatusChange}
                    value={status || ''}
                >

                    {console.log("from select", item._id, status)}
                    {item.orderMode == 'Delivery'
                        ? delivery.map((del) => <option key={del.label} value={del.value}>{del.label}</option>)
                        : pickup.map(pick => <option key={pick.label} value={pick.value}>{pick.label}</option>)
                    }
                </select>
                <button className="btn btn-primary" onClick={handleOrderStatusUpdate}> Update </button>
            </div>
        )
    }
    else
        updater = (<p><b>CANCELLED</b></p>)



    return (
        <div key={item._id} style={{ boxShadow: "2px 2px 15px", margin: "10px" }} >
            <li class="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={onCustNameClick}

                    >
                        <b>Customer : </b>
                        <span style={{ border: "1px solid black", backgroundColor: "black", color: "white", padding: "5px", cursor: "pointer", borderRadius: "5px" }}>
                            <i> {item.customer.name}</i>
                        </span>
                    </div>
                    <hr />
                    <p><b>OrderID:</b>  {item._id}</p>
                    <div style={{
                        backgroundColor: '#eee', padding: '10px', borderRadius: '10px'
                    }}>
                        {
                            item.orderItems.map((d) => {
                                return (
                                    <div style={{
                                        width: '500px', display: 'flex', justifyContent: 'space-between',

                                    }}>
                                        <p>{d.dishQuantity}</p>
                                        <p>{d.dishName}</p>
                                        <p>{d.itemPrice}</p>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <hr />
                    <p><b>Note :</b> <i> {item.orderNote}</i></p>
                    <hr />
                    <p><b>Order Total : <i>$ {item.total}</i></b></p>
                </div>


                {updater}

            </li>
        </div>
    )
}

export default SingleOrder
