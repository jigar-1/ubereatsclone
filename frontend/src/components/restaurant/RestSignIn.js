import axios from 'axios';
import cookie from 'react-cookies';
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { fetchRestLoginSuccess } from '../../redux/Restaurant/Login/RestLoginActions';
import { fetchRestSuccess } from '../../redux/Restaurant/Rest/RestActions'
import API_BASE_URL from '../../utils/constants';

const RestSignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState();
    const isCustomer = false;

    const dispatch = useDispatch()

    const submitLogin = (e) => {
        console.log('restlogin pressed')
        e.preventDefault();


        axios.defaults.withCredentials = true;
        axios.post(`${API_BASE_URL}/login/`, {
            email: email,
            password: password,
            isCustomer: isCustomer
        }).then(response => {

            console.log("LOGGED")
            if (response.data.auth) {
                setToken(response.data.jwt)
                console.log("TOKEN", response.data.jwt)
                console.log(response.data.restaurant)
            }
            else {
                setMessage(response.data.message);
            }

            dispatch(fetchRestSuccess(response.data.restaurant))
            // console.log("Status Code: ", response.status);
            // if (response.status === 200) {
            //     console.log("OK")
            // }
            // else {
            //     console.log('Auth Failed')
            // }

            // console.log("Login Response Data:", response.data);


            // console.log(cookie.load('restId'))
            // console.log('rest:', response.data.restaurant);
            // setMessage(response.data.message);

            // console.log(response.data.auth, "    ", response.data.message)


            // dispatch(fetchRestLoginSuccess(response.data.credentials));
            // if (response.data.auth)
            //     props.history.push('/restHome');

        }).catch(err => {
            console.log('Auth Failed')
            console.log(err)
            // setMessage(err.data.message);
            // console.log(message)
        }

        )
    }
    // if (cookie.load('restId')) {
    //     redirectVar = <Redirect to="/restHome" />
    // }
    let redirectVar = null;
    if (token) {
        localStorage.setItem("token", token);

        var decoded = jwt_decode(token.split('.')[1], { header: true });
        console.log(decoded);
        localStorage.setItem("restaurant_id", decoded._id);
        localStorage.setItem("email", decoded.email);

        redirectVar = <Redirect to="/restHome" />
    }

    return (
        <div className="cover-rest">

            {redirectVar}
            <div className="detail">
                <h2>Manage you Restaurant!</h2>
                <h6>New to Uber Eats ? <button ><a href="/restSignUp" >Sign Up</a></button></h6>
                <div className="detail" style={{ top: "250px", backgroundColor: "transparent" }}>
                    <button style={{ width: '150px' }} ><a href="/persona" >Switch Persona</a></button>
                </div>
            </div>

            <div className="form-rest-signin">

                <h2 className="logo"><span id="one">Uber</span><span id="two">Eats</span></h2>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="eg. xyz@gmail.com" required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="xxxxxxxxxxxx" required />

                <button onClick={submitLogin} type="button">Login</button>
                <p className="msg" style={{ paddingTop: "20px", paddingLeft: "20px" }} >{message}</p>

            </div>

        </div>
    )
}

export default RestSignIn
