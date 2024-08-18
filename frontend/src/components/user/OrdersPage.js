import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import API_BASE_URL from '../../utils/constants';
import LandingTopNav from './common/LandingTopNav';
import OrderReceiptModal from './OrderReceiptModal';

const OrdersPage = () => {

    const [orderData, setOrderData] = useState([]);
    // const restData = useSelector(state => state.restGrid.restaurants);
    // const [orderItemsData, setOrderItemsData] = useState([]);
    const [orderShow, setOrderShow] = useState(false);
    const [receipt, setReceipt] = useState();
    const [pageLimit, setPageLimit] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [status, setStatus] = useState('All Orders');
    const [pageIcons, setPageIcons] = useState([]);
    // const [orderStatus, setOrderStatus] = useState('orderStatus')


    const custData = useSelector(state => state.user.user)
    const fetchOrders = async (orderStatus = "All Orders", pageLimit = 5, pageNumber = 1) => {

        let payload = {
            orderStatus,
            pageLimit,
            pageNumber
        }


        const orderRes = await axios.get(`${API_BASE_URL}/orders/${custData._id}`, { params: payload })

        console.log("payload:", orderStatus, pageLimit, pageNumber)

        setOrderData(orderRes.data)
        // console.log(pageNumber)
        if (orderRes.status === 200) {

            if (parseInt(pageNumber) === 1) {
                console.log("HERE")
                // console.log(status)
                console.log(orderStatus)

                const payload2 = {
                    orderStatus
                }
                console.log(payload2)

                const count = await axios.get(`${API_BASE_URL}/ordersCount/${custData._id}`, { params: payload2 })
                console.log(count.data.length)
                let numberOfPages = Math.ceil(count.data.length / pageLimit);
                let pageList = [];

                for (let i = 1; i <= numberOfPages; i++) {
                    pageList.push({
                        pageNumber: i,
                        isSelected: (i === 1 ? true : false)
                    })
                }

                setPageIcons(pageList)
            }
        }
        //        

        //         console.log("numOfPages", numberOfPages)

        //         for (let i = 1; i <= numberOfPages; i++) {
        //             pageList.push({
        //                 pageNumber: i,
        //                 isSelected: (i === 1 ? true : false)
        //             })
        //         }
        //         setPageIcons(pageList)
        //     }
        //     setOrderData(orderRes.data)

        // }
        // else {
        //     console.log("Unsuccessful Request")
        // }
        // // if(pageNumber==1 )

    }




    const handleOrderStatusUpdate = (item) => {


        console.log("HERE", item)
        setStatus(item.orderStatus)
        axios
            .put(`${API_BASE_URL}/orders/${item._id}`, { status: 'Cancelled', filter: item.orderFilter })
            .then(res => {
                console.log(res.data)
                fetchOrders(status, pageLimit)
            })
            .catch(err => {
                console.log("ERROR:", err)
            })
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    const receiptHandler = (item) => {
        console.log("RECEIPT NO", item)
        setOrderShow(true)
        setReceipt(item)

    }

    const paginationHandler = (e) => {
        console.log("SELECTED:", e.target.text)
        setPageNumber(e.target.text);
        pageIcons.forEach((i) => {
            i.isSelected = (i.pageNumber === parseInt(e.target.text) ? true : false)
        })

        fetchOrders(status, pageLimit, e.target.text)
    }
    const handleOrderStatus = (e) => {
        console.log("SELECTED:", e.target.value)
        setStatus(e.target.value)
        fetchOrders(e.target.value, pageLimit)
    }

    const handleLimitChange = (e) => {
        console.log("SELECTED:", e.target.value)
        setPageLimit(e.target.value)
        console.log(status, e.target.value, pageNumber)
        fetchOrders(status, e.target.value)
    }

    // alert(pages)

    // let redirectVar = null;
    // if (!cookie.load('userId')) {
    //     redirectVar = <Redirect to="/userSignIn" />
    // }

    return (

        <div>
            {/* {redirectVar} */}
            <LandingTopNav />
            <hr />
            <div className=''>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h2>Orders</h2>

                    <select onChange={handleOrderStatus} style={{ width: '300px' }}> Orders
                        <option value="All Orders">All Orders</option>
                        <option value="Order Received">Order Received</option>
                        <option value="Preparing">Preparing</option>
                        <option value="On the Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pick Up Ready">Pick Up Ready</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div>
                        <label>Page Limit </label>
                        <select value={pageLimit} onChange={handleLimitChange} style={{ width: '100px', marginLeft: '5px' }}> Orders
                            {/* <option >{pageLimit}</option> */}
                            <option value='2'>2</option>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                        </select>
                    </div>
                </div>

                {orderData.length ? "" : <p style={{ textAlign: 'center' }}>"Nothing to see here!"</p>}


                {


                    orderData.map((item, index) => {
                        let cancel_btn = null;
                        if (item.orderStatus == 'Order Received') {
                            cancel_btn = (
                                // <div >

                                <button className='cancel-btn' onClick={() => handleOrderStatusUpdate(item)}>
                                    Cancel
                                </button>
                                // </div>
                            )
                        }



                        return (

                            // cartItems.reduce((sum, j) => sum + (j.price * j.quantity), 0)
                            <ul className="list-group list-group-flush" key={index} >
                                {/* <div className="order-wrapper" > */}
                                <div className="container list-group-item list-group-item-action" style={{ boxShadow: "1px 1px 10px", marginTop: "10px", marginBottom: "10px" }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                                        <div className='col-6'>


                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{item.restName} </h5>

                                            </div>
                                            <p className="mb-1">
                                                {item.orderItems.reduce((count, i) => count + i.dishQuantity, 0)} items for $ {item.total}  place on <b>{item.orderTime.substring(0, 10)}</b> at <b>{item.orderTime.substring(11, 19)}</b></p>
                                            <div className='hoverable' onClick={() => receiptHandler(item)} ><b><u>View receipt</u></b>
                                            </div>
                                        </div>

                                        <div className='col-3'>
                                            <p> <b>{item.orderStatus}</b></p>

                                        </div>
                                        <div className='col-3'>
                                            {cancel_btn}
                                        </div>
                                    </div>
                                </div>


                                {/* </div> */}
                            </ul>
                        )
                    }
                    )
                }

                <OrderReceiptModal onClose={() => setOrderShow(false)} receipt={receipt} show={orderShow} />

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {pageIcons.map(i => {
                            console.log("mappng", i.pageNumber, i.isSelected)
                            let isActive = i.isSelected == true ? "page-item active" : "page-item";

                            return (<li className={isActive} ><a className="page-link" onClick={paginationHandler}>{i.pageNumber}</a></li>)
                        })}
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default OrdersPage
