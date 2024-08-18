import axios from 'axios';
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { fetchUserSuccess } from '../../redux/user/User/UserActions';
import API_BASE_URL from '../../utils/constants';
// import cookie from 'react-cookies';
// import { fetchUserLoginSuccess } from '../../redux/user/Login/UserLoginActions';
// import { fetchLocationSuccess } from '../../redux/user/Location/LocationActions';

const UserSignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState();
    const isCustomer = true;
    // const [authFlag, setAuthFlag] = useState(false);
    // const [data, setData] = useState();

    const dispatch = useDispatch()

    const submitLogin = async (e) => {
        console.log('userlogin pressed')
        e.preventDefault();

        axios.defaults.withCredentials = true;
        axios.post(`${API_BASE_URL}/login/`, {
            email: email,
            password: password,
            isCustomer: isCustomer
        }).then(response => {
            console.log("SSS", response)
            if (response.data.auth) {
                setToken(response.data.jwt)
                console.log(token)
                console.log(response.data.customer)
            }
            else {
                setMessage(response.data.message);
            }
            dispatch(fetchUserSuccess(response.data.customer));

            // console.log("Cust LOC:", response.data.custLocation);
            // dispatch(fetchUserLoginSuccess(response.data.credentials));
            // dispatch(fetchLocationSuccess(response.data.custLocation));
        })
            .catch(err => {
                console.log('Auth Failed')
                console.log(err)
                // setMessage(err.data.message);
                // console.log(message)
            }

            )
    }



    // if (cookie.load('userId')) {
    //     redirectVar = <Redirect to="/" />
    // }
    let redirectVar = null;
    if (token) {
        localStorage.setItem("token", token);

        var decoded = jwt_decode(token.split('.')[1], { header: true });
        console.log(decoded);
        localStorage.setItem("customer_id", decoded._id);
        localStorage.setItem("email", decoded.email);

        redirectVar = <Redirect to="/" />
    }

    return (



        <div className="cover-user">
            {redirectVar}


            <div className="detail">
                <h2>Tasty food just a few clicks away!</h2>
                <h6>New to Uber Eats ? <button ><a href="/userSignUp" >Sign Up</a></button></h6>
            </div>
            <div className="detail" style={{ top: "250px", backgroundColor: "transparent" }}>
                <button ><a href="/persona" >Switch Persona</a></button>
            </div>
            <div className="form-user-signin">

                <h2 className="logo"><span id="one">Uber</span><span id="two">Eats</span></h2>


                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="eg. xyz@gmail.com" required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />

                <button onClick={submitLogin} type="button">Login</button>

                <p className="msg" style={{ paddingTop: "20px", paddingLeft: "20px" }} >{message}</p>
            </div>


        </div>
    )
}

export default UserSignIn
