import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import API_BASE_URL from '../../utils/constants';

const AddAddressModal = (props) => {


    const [data, setData] = useState();
    const handleChange = (key, value) => {
        setData({ ...data, [key]: value })
    }
    const custData = useSelector(state => state.user.user)

    const addAddress = (e) => {
        e.preventDefault();
        const payload = {
            custId: custData._id,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            zipcode: data.zipcode

        }
        console.log("CONFIRM")
        axios.post(`${API_BASE_URL}/custAddress/`, payload)
            .then(response => {


                console.log("Status Code: ", response.status);
                if (response.status === 200) {
                    console.log("OK")
                    console.log("updated: ", response.data);
                    props.onSuccess()
                    props.onClose()
                }

                // props.onClose();
            }).catch(err => {
                console.log(err.response.data)
            })

    }
    if (!props.show) {
        return null
    }


    return (
        < div className="modal"  >
            <div className="modal-content" style={{ height: '450px', width: '400px' }} onClick={e => e.stopPropagation}>
                <div className="modal-header" onClick={props.onClose}>

                    <div><h2 className="modal-title">
                        Add New Address
                    </h2>
                    </div>
                </div>
                <div className="modal-body">
                    <form style={{ display: "flex" }} onSubmit={addAddress} >
                        <div>

                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label htmlFor="price">Street</label>
                                    <input type="text" className="form-control" onChange={(e) => {
                                        handleChange(
                                            'street', e.target.value)
                                    }} id="street" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" onChange={(e) => {
                                        handleChange(
                                            'city', e.target.value)
                                    }} id="city" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="form-control" onChange={(e) => {
                                        handleChange(
                                            'state', e.target.value)
                                    }} id="state" required />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="country">Country</label>
                                    <select id="country" onChange={(e) => { handleChange('country', e.target.value) }}
                                        className="form-control" required >
                                        <option value>Choose...</option>
                                        <option>USA</option>
                                        <option>India</option>
                                        <option>China</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="zipcode">Zip Code</label>
                                    <input type="number" className="form-control" onChange={(e) => {
                                        handleChange(
                                            'zipcode', e.target.value)
                                    }} id="zipcode" required />
                                </div>

                            </div>

                            {/* <button type="submit" className="btn btn-primary" > Save Item</button> */}
                            <div className="modal-footer">

                                <button type="submit" className="modal-btn"  >
                                    CONFIRM ADDRESS
                                </button>

                            </div>
                        </div>
                    </form>




                </div>


            </div>
        </div >
    )
}

export default AddAddressModal
