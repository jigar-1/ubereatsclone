import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { SignUpSuccess } from '../../redux';
import API_BASE_URL from '../../utils/constants';

const UserSignup = (props) => {

    console.log(props);
    const [name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const isCustomer = true;

    const dispatch = useDispatch()
    const createAccount = async (e) => {


        e.preventDefault();
        Axios.post(`${API_BASE_URL}/customers`, {
            email,
            password,
            name,
            addresses: [{}]
        })

            .then((res) => {
                dispatch(SignUpSuccess("Successful Signup"))
                console.log(res);
                props.history.push('/userSignIn')
            })
    }

    return (
        <div className="cover-user">


            <div className="detail">
                <h2>Let's setup your account!</h2>
                <h6>Already have an account ?  <button><a href="/userSignIn" >Login</a></button></h6>
            </div>

            <form className="form-user-signup" onSubmit={createAccount}>

                <h2 className="logo"><span id="one">Uber</span><span id="two">Eats</span></h2>

                <label htmlFor="name">Name </label>
                <input type="text" name="name" onChange={(e) => { setUserName(e.target.value) }} placeholder="eg. John" required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} pattern="[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="eg. xyz@gmail.com" required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$%!@#+^&*]).{8,}" placeholder="xxxxxxxxxxxx" required />

                <button type="submit">Create Account</button>
            </form>


        </div>
    )
}

export default UserSignup
