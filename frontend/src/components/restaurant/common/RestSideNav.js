import React from 'react'
import { Link } from 'react-router-dom'
const RestSideNav = (props) => {
    const Home = "nav-link " + props.Home;
    const Menu = "nav-link " + props.Menu;
    const Orders = "nav-link " + props.Orders;

    return (
        <div className="side-nav">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className={Home} to="/restHome"> <i className="bi bi-house"></i> Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={Menu} to="/restMenu"> <i className="bi bi-cup-straw"></i> Menu</Link>
                </li>
                <li className="nav-item">
                    <Link className={Orders} to="/restOrders"> <i className="bi bi-receipt"></i> Orders</Link>
                </li>
            </ul>
        </div>
    )
}

export default RestSideNav
