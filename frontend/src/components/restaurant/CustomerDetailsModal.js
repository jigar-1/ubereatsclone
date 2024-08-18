import React from 'react'

const CustomerDetailsModal = (props) => {
    // console.log("PPP", props.custDetails.customer.custPic);
    if (!props.show) {
        return null
    }
    return (
        < div className="modal" onClick={props.onClose} >
            <div className="modal-content" onClick={e => e.stopPropagation}>
                <div className="modal-header">

                    <div><h2 className="modal-title">
                        Customer Profile
                    </h2>
                    </div>
                </div>
                <div className="modal-body">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img className='cust-modal-pic' src={props.custDetails.customer.profilePic} alt="ads" ></img>
                        <div>

                            <p>Name: {props.custDetails.customer.name}</p>
                            {/* <p>Name: {props.custDetails.customer.custName}</p> */}
                        </div>
                    </div>
                    {/* <label>Location:</label> */}
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                        <div>
                            <p>Address:</p>
                        </div>
                        <div>
                            <p> {props.custDetails.customer.street}, {props.custDetails.customer.city}</p>
                            <p>{props.custDetails.customer.state}, {props.custDetails.customer.country},{props.custDetails.customer.zipcode}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                        <div>
                            <p> Phone Number:</p>
                        </div>
                        <div>
                            <p> {props.custDetails.customer.phoneno ? props.custDetails.customer.phoneno : 'Unavailable'}</p>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">

                    <button className="modal-btn" onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div >
    )
}

export default CustomerDetailsModal
