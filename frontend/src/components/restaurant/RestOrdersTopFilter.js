import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const RestOrdersContent = (props) => {

    const [tab, setTab] = useState(1);

    // const handleTabChange = props.handleTabChange;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Orders</h1>
                <div>
                    <label>Page Limit </label>
                    <select value={props.pageLimit} onChange={props.handleLimitChange} style={{ width: '100px', marginLeft: '5px' }}> Orders
                        {/* <option >{pageLimit}</option> */}
                        <option value='2'>2</option>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                    </select>
                </div>
            </div>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={() => {
                    setTab(1)
                    props.fetchOrders('All Orders')
                }
                }>
                    <Link className={tab === 1 ? 'nav-link' : 'nav-link-active'} to="#">All Orders</Link>
                </li>
                <li className="nav-item" onClick={() => {
                    setTab(2)
                    props.fetchOrders('New Order')
                }
                }>
                    <Link className={tab === 2 ? 'nav-link' : 'nav-link-active'} to="#">New Orders</Link>
                </li>
                <li className="nav-item" onClick={() => {
                    setTab(3)
                    props.fetchOrders('Completed Order')
                }
                } >
                    <Link className={tab === 3 ? 'nav-link' : 'nav-link-active'} to="#">Completed Orders</Link>
                </li>
                <li className="nav-item" onClick={() => {
                    setTab(4)
                    props.fetchOrders('Cancelled Order')
                }
                } >
                    <Link className={tab === 4 ? 'nav-link' : 'nav-link-active'} to="#">Cancelled Orders</Link>
                </li>
            </ul>
        </div>
    )
}

export default RestOrdersContent
