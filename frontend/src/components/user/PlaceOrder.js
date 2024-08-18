import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API_BASE_URL from '../../utils/constants'
import AddAddressModal from './AddAddressModal'
import LandingTopNav from './common/LandingTopNav'
import OrderSummary from './OrderSummary'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { clearCart } from '../../redux'
import cookie from 'react-cookies';
import { Redirect } from 'react-router'

const PlaceOrder = (props) => {
    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems;
    const user = useSelector(state => state.user.user)
    // const custData = useSelector(state => state.user.user)
    const custLoc = user.addresses;
    let total = cartItems.reduce((sum, j) => sum + (j.price * j.quantity), 0)

    const [show, setShow] = useState(false)
    const [custAdd, setCustAdd] = useState({});
    const [addresses, setAddresses] = useState([])
    const [note, setNote] = useState();


    const dispatch = useDispatch()
    useEffect(() => {
        // console.log("hello")
        fetchAddresses()
    }, [])

    const handleCustAdd = async (e) => {
        console.log("selected Address", addresses[e.target.value])
        setCustAdd(addresses[e.target.value])
    }
    const fetchAddresses = () => {

        // console.log("custid 22222!!!", user._id)
        axios
            .get(`${API_BASE_URL}/custAddress/${user._id}`)
            .then(response => {
                console.log("RESPONSE", response.data)
                setAddresses(response.data)
            })
            .catch(err => console.log(err))
    }

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    }

    const handleOrder = () => {
        const orderItems = cartItems.map(i => ({
            dishId: i._id,
            dishName: i.name,
            dishQuantity: i.quantity,
            itemPrice: i.price
        }))
        const customer = {
            customerId: user._id,
            name: user.name,
            profilePic: user.profilePic,
            phoneno: user.phoneno,
            street: custAdd.street,
            city: custAdd.city,
            state: custAdd.state,
            country: custAdd.country,
            zipcode: custAdd.zipcode
        }

        const payload = {
            customer,
            restId: cart.currentRest.restId,
            restName: cart.currentRest.restName,
            orderStatus: "Order Received",
            orderFilter: "New Order",
            orderMode: cart.orderMode,
            total: total,
            // custAddressId: custAdd,
            note,
            orderItems
        }

        if (cart.cartQuantity > 0) {
            axios.post(`${API_BASE_URL}/orders`, payload)
                .then(res => {
                    store.addNotification({
                        title: "Order Placed Successfully!",
                        message: "New Order Created!",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 3000,
                            onScreen: true
                        }
                    });
                    dispatch(clearCart())
                    props.history.push('/')
                })
                .catch(err => console.log("ERRROR IN ORDER", err))
        }
    }
    // let redirectVar = null;
    // if (!cookie.load('userId')) {
    //     redirectVar = <Redirect to="/userSignIn" />
    // }
    return (
        <div className="content-grid">
            {/* {redirectVar} */}
            <LandingTopNav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <div className="row">
                            <div className="col-4"><h1> Your items</h1></div>
                            <div className="col-8" style={{ display: "flex", justifyContent: 'flex-end' }}>
                                <select
                                    style={{
                                        width: '200px', height: '50px', color: 'white',
                                        backgroundColor: 'black', fontWeight: '500', outline: 'none', border: 'none'
                                    }}
                                    onChange={handleCustAdd}
                                >
                                    <option selected>Choose Delivery Address</option>
                                    {
                                        addresses.map((i, index) => {
                                            console.log("add", i)
                                            return (<option value={index} style={{ height: '90px' }} key={i._id}>
                                                {i.street + "," + i.city + "," + i.state + "," + i.country}
                                            </option>)
                                        })
                                    }
                                </select>
                                <button onClick={() => { setShow(true) }}
                                    style={{ width: '150px', marginLeft: '10px', height: '50px', color: 'white', backgroundColor: 'black', fontWeight: '500', outline: 'none', border: 'none' }}>
                                    Add Address
                                </button>
                                <AddAddressModal onSuccess={fetchAddresses} onClose={() => setShow(false)} show={show} />
                            </div>
                        </div>
                        <br />
                        <hr />
                        <OrderSummary />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4" id="set">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ marginBottom: "10px" }}> <b>Special intstructions (if any) : </b></div>
                            <div>
                                <textarea name="" id="" cols="40" rows="5" style={{ padding: "10px" }}
                                    placeholder="Add a note to restaturant" onChange={handleNoteChange}></textarea>
                            </div>

                            <button
                                onClick={handleOrder}
                                style={{
                                    width: '300px', height: '50px', color: 'white', backgroundColor: "#06c167"
                                    , fontWeight: '500', outline: 'none', border: 'none'
                                }}>
                                PLACE ORDER
                            </button>
                            <br />
                            <div><p>TOTAL:  ($) <span>{total.toFixed(2)}</span></p></div>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}

export default PlaceOrder
