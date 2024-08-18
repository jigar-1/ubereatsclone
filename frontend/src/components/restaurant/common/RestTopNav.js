import React from 'react'
import { useDispatch } from 'react-redux'
import cookie from 'react-cookies';
import { delAuthSuccess } from '../../../redux/Auth/AuthActions';
import { logout } from '../../../redux/rootReducer';
import { Redirect } from 'react-router';

const RestTopNav = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        // cookie.remove('restId', { path: '/' })
        localStorage.clear();

        dispatch(logout())

    }

    // let redirectVar = null;
    // if (!cookie.load('restId')) {
    //     redirectVar = <Redirect to="restSignin" />
    // }

    return (
        <div className="top-nav">
            {/* {redirectVar} */}
            <ul className="nav">
                <div>
                    <h4 className="logo-rest"><span id="one-rest">Uber</span><span id="two">Eats</span></h4>
                    <p>for Restaurants</p>
                </div>
                <li className="nav-item">
                    <a onClick={handleLogout} className="nav-link" id="rest-logout" href="/restSignIn">Logout</a>
                </li>
            </ul>
        </div>
    )
}

export default RestTopNav
