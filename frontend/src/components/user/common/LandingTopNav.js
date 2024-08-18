import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar';
import { Link } from 'react-router-dom'
// import cookie from 'react-cookies';
import CartModal from '../../CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchText, getRestIdFromDish, onlyDelivery, onlyPickup, setOrderMode } from '../../../redux';
import axios from 'axios';
import API_BASE_URL from '../../../utils/constants';
import NewOrderModal from '../../NewOrderModal';
// const ENTER_KEY = 13;
const LandingTopNav = () => {

    const cart = useSelector(state => state.cart)
    const searchText = useSelector(state => state.restGrid.searchText);
    const custLoc = useSelector(state => state.user.user.addresses)
    const dispatch = useDispatch();

    const [show, setShow] = useState(false)
    const [searchTerm, setSearchTerm] = useState();


    const showBar = () => {
        const popup = document.getElementById('overlay');

        popup.classList.add('overlay-show')
        popup.classList.remove('overlay-hide');;
    }

    // const itemCount = 0;

    let login_button_display = null;
    if (!localStorage.getItem('token')) {
        login_button_display = (
            <ul className="nav navbar-nav navbar-right">
                <button><Link style={{ textDecoration: 'none', color: 'black' }} to="/userSignIn"><span className="glyphicon glyphicon-log-in"></span> Sign in </Link></button>
            </ul>
        )
    }

    const filterDelivery = (e) => {
        dispatch(setOrderMode("Delivery"))
        let element2 = document.getElementById('pick')
        element2.style.backgroundColor = '#efefef'
        e.target.style.backgroundColor = 'white'
        element2.style.transition = 'all ease-in 0.3s'
        dispatch(onlyDelivery())
    }

    const filterPickup = (e) => {
        dispatch(setOrderMode("Pickup"))
        let element1 = document.getElementById('del')
        element1.style.backgroundColor = '#efefef'
        element1.style.transition = 'all ease-in 0.3s'
        e.target.style.backgroundColor = 'white'
        dispatch(onlyPickup())
    }

    const handleOnChange = (e) => {
        const dishName = e.target.value;
        axios.get(`${API_BASE_URL}/getRestIdsFromDish/`, { params: { dishName } })
            .then(res => {
                console.log("Rest Ids:", res.data)

                dispatch(getRestIdFromDish(res.data))
            })
            .catch(err => {
                console.log(err)
            })

        setSearchTerm(e.target.value)
        dispatch(addSearchText(e.target.value));
    }


    return (
        <div>
            <SideBar />
            <div className="navbar" >
                <i className="bi bi-list" onClick={showBar}></i>

                <h2 className="logo"><Link to='/' style={{ textDecoration: 'none', color: 'black' }} ><span id="one">Uber</span><span id="two">Eats</span></Link></h2>

                <div className="wrapper-btns">
                    <button className="btn-del" id="del" onClick={filterDelivery}> Delivery</button>
                    <button className="btn-pick" id="pick" onClick={filterPickup}> Pickup </button>
                </div>
                <div className="nav-loc-wrapper">
                    <button className="btn-location"><i className="bi bi-geo-alt-fill"></i> {custLoc ? custLoc[0].street : " "} | {custLoc ? custLoc[0].city : " "} </button>
                </div>

                <div className="search" >
                    <i className="bi bi-search"></i><input type="text" placeholder="What are you craving?" onChange={handleOnChange} value={searchText} ></input>
                </div>
                <div className="cart-wrapper">
                    <button className="cart" onClick={() => { setShow(true) }}> <i className="bi bi-cart-fill"></i> Cart <i className="bi bi-dot"></i> {cart?.cartQuantity} </button>
                    <CartModal onClose={() => setShow(false)} show={show} />
                    <NewOrderModal />
                </div>
                <div className="cart-wrapper">
                    {login_button_display}

                </div>
            </div >
        </div >
    )
}

export default LandingTopNav
