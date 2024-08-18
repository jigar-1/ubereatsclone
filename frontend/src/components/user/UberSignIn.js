import React from 'react'
import './user.css'

const UberSignIn = () => {
    return (
        <div>
            <div className="login-wrapper">

                <h2 className="logo"><span id="one">Uber</span><span id="two" style={{ color: "#5fb709" }}>Eats</span></h2>
                <div className="login-content">
                    <h4> Welcome back</h4>
                    <h6>Sign in with your email address </h6>
                    <input type="text" value="Email" />
                    <button>Next</button>
                </div>
                <p>New to Uber? <a href='/userSignUp'>Create an account</a></p>


            </div>
        </div>
    )
}

export default UberSignIn
