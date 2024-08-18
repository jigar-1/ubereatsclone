import React from 'react'
import { Link } from 'react-router-dom'
const Persona = () => {
    return (
        <div className="persona-container">
            <h2 className="logo"><span id="one">Uber</span><span id="two">Eats</span></h2>
            <h1>Persona Selection: </h1>

            <div className="choose-persona">
                <button><Link style={{ textDecoration: "none" }} to='/restSignIn'  >Restaurant</Link> </button>
                <button><Link style={{ textDecoration: "none" }} to='/userSignIn' >Customer </Link></button>
            </div>


        </div>
    )
}

export default Persona

