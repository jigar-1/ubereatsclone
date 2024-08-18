import React, { useEffect, useState } from 'react'
import cookie from 'react-cookies';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { logout } from '../../redux/rootReducer';
const SideBar = (props) => {
    // const userName = 'Name';
    const dispatch = useDispatch();

    const handleLogout = () => {
        // cookie.remove('userId', { path: '/' })
        localStorage.clear();
        dispatch(logout())
    }
    const custData = useSelector(state => state.user.user)
    const [data, setData] = useState()

    useEffect(() => {
        setData(custData)
    }, [custData])

    console.log(custData)
    const hideBar = () => {
        const popup = document.getElementById('overlay');

        popup.classList.add('overlay-hide');
        popup.classList.remove('overlay-show');

    }
    let signout_button_display = null;
    if (localStorage.getItem('token')) {

        signout_button_display = (
            <p><a style={{ textDecoration: 'none', color: 'black' }} href="/userSignIn" onClick={handleLogout}>Sign Out</a></p>
        )
    }
    else {
        signout_button_display = (
            <p><Link style={{ textDecoration: 'none', color: 'black' }} to="/userSignIn" >Sign In</Link></p>
        )
    }
    return (
        <div id="overlay" className='overlay-hide' >
            <div className="SideBar" >
                <div className="side-acc-btn">
                    <img src={data?.profilePic} alt="" />
                    <div className="side-acc-link">
                        <p>{data?.name}</p>
                        <p><Link to='/userProfile' >View Account</Link></p>
                    </div>


                </div>

                <div className="side-acc-orders">
                    <p> <Link to='/OrdersPage' ><i className="bi bi-receipt"></i> Orders</Link></p>
                </div>
                <div className="side-acc-fav">

                    <p> <Link to='/favouritesPage' style={{ textDecoration: 'none', color: 'black' }}  ><i className="bi bi-heart-fill"></i> Favourites </Link></p>
                </div>

                <div className="side-logout">
                    {signout_button_display}
                </div>
            </div>
            <div className="blocker" onClick={hideBar}>
            </div>
        </div>
    )
}

export default SideBar
