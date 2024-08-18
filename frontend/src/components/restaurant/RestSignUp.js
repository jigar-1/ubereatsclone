import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import fetchRestSignup from '../../redux/Restaurant/Signup/RestSignupActions';

const RestSignup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');

    // const isCustomer = false;


    const dispatch = useDispatch();

    const createAccount = async (e) => {
        e.preventDefault();
        console.log("created account!")

        const restCreds = {
            userEmail: email,
            userPassword: password,
            // isCustomer: isCustomer
        }

        const restDetails = {
            email: email,
            password: password,
            name: name,
            // about: "",
            open: "10:00:00",
            close: "22:00:00",
            isPickup: true,
            isDelivery: true,
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zip,
            phoneno: "",
            image: "https://icon-library.com/images/cafe-icon/cafe-icon-15.jpg",

        }
        try {
            await dispatch(fetchRestSignup(restCreds, restDetails))
            props.history.push('/restSignIn')
        } catch (err) {
            console.log("Signup Error", err)
        }


    }

    return (
        <div className="cover-rest">
            <div className="contain">

                <div className="detail">
                    <h2>Let's setup your account!</h2>
                    <h6>Already have an account? <button><a href="/restSignIn" >Login</a></button></h6>
                </div>

                <div className="form-rest-signup">

                    <h2 className="logo"><span id="one">Uber</span><span id="two">Eats</span></h2>

                    <form onSubmit={createAccount}>
                        <div className="form-group" >
                            <label htmlFor="inputAddress">Restaturant Name</label>
                            <input required type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} id="inputAddress" placeholder="KFC" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input required type="email" className="form-control" pattern="[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => { setEmail(e.target.value) }} id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input required type="password" className="form-control" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$%!@#+^&*]).{8,}" onChange={(e) => { setPassword(e.target.value) }} id="inputPassword4" placeholder="Password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputAddress2">Street</label>
                            <input required type="text" className="form-control" onChange={(e) => { setStreet(e.target.value) }} id="inputAddress2" placeholder="1230 Main St" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input required type="text" className="form-control" onChange={(e) => { setCity(e.target.value) }} id="inputCity" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputState">State</label>
                                <input required type="text" className="form-control" onChange={(e) => { setState(e.target.value) }} id="inputState" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputState">Country</label>
                                <select required id="inputState" onChange={(e) => { setCountry(e.target.value) }} className="form-control">
                                    <option value>Choose</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="China">China</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputZip">Zip</label>
                                <input required type="text" onChange={(e) => { setZip(e.target.value) }} className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <button type="submit" style={{ backgroundColor: '#06c167', overflow: 'hidden', marginRight: '5%', marginLeft: '5%' }}
                            className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default RestSignup
