import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import cookie from 'react-cookies';
import { updateRest } from '../../redux/Restaurant/Rest/RestActions';
import { Redirect } from 'react-router';
import { ACCESS_SECRET_KEY_ID, ACCESS_KEY_ID } from '../../utils/constants';
import S3FileUpload from 'react-s3';


const config = {
    bucketName: 'uber-eats-proto',
    dirName: 'restaurants/', /* optional */
    region: 'us-east-2',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: ACCESS_SECRET_KEY_ID
}

const RestDetails = () => {
    const [iseditable, setEditable] = useState('disabled')
    const [data, setData] = useState();
    const restData = useSelector(state => state.rest.rest)
    const dispatch = useDispatch()

    // const creds = useSelector(state => state.restCreds.credentials)
    // console.log(restData)
    // const currentUser = cookie.load('restId')
    // console.log(currentUser)

    useEffect(() => {
        setData(restData)
    }, [restData])

    const handleChange = (key, value) => {
        setData({ ...data, [key]: value })
    }

    // console.log(creds)
    const makeEditable = () => {
        setEditable('')
    }

    const makeUneditable = () => {
        setEditable('disabled')
        // console.log(data.open)
        // console.log(typeof data.open)

        const payload = {
            name: data.name,
            about: data.about,
            open: data.open,
            close: data.close,
            isPickup: data.isPickup,
            isDelivery: data.isDelivery,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            zipcode: data.zipcode,
            phoneno: data.phoneno,
            image: data.image
        }
        dispatch(updateRest(restData._id, payload))

    }
    let editSaveButton = null;
    if (iseditable === '') {
        editSaveButton = (
            <button type="button" onClick={makeUneditable} className="btn btn-primary">Save</button>
        )
    }
    else {
        editSaveButton = (
            <button type="button" onClick={makeEditable} className="btn btn-primary">Edit Details</button>
        )
    }

    const upload = (e) => {
        console.log(e.target.files[0])
        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then((data => {
                handleChange('image', data.location)
            }))
            .catch(err => {
                alert(err)
            })

    }


    // let redirectVar = null;
    // if (!cookie.load('restId')) {
    //     redirectVar = <Redirect to="restSignin" />
    // }

    return (

        <div>
            {/* {redirectVar} */}
            <div className="profile-wrapper">
                <div className="media" id="rest-profile-wrapper">
                    <div className="image-upload-wrapper">
                        <img className="rest-image-wrapper" style={{ width: '250px', height: '200px', objectFit: 'cover' }}
                            src={data?.image}
                            alt="DP" />
                        <div style={{ paddingLeft: '50px', paddingTop: '5px' }}>
                            <input disabled={iseditable} type="file" onChange={upload} />
                        </div>
                    </div>
                    <div className="media-body-rest">
                        <label htmlFor='name'>Name:</label>
                        <input disabled={iseditable} type="text" onChange={(e) => { handleChange('name', e.target.value) }} name='name' defaultValue={data?.name} />

                        <label htmlFor='about'>About:</label>
                        <textarea disabled={iseditable} name='about' onChange={(e) => { handleChange('about', e.target.value) }} defaultValue={data?.about} />

                        <label htmlFor='open'>Open: </label>
                        <input disabled={iseditable} type="time" onChange={(e) => {
                            handleChange('open', toString(e.target.value))
                            // setOpen(e.target.value) 
                        }} name='open' defaultValue={data?.open} />

                        <label htmlFor='close'>Close: </label>
                        <input disabled={iseditable} type="time" onChange={(e) => {
                            handleChange('close', toString(e.target.value))
                            // setClose(e.target.value)

                        }} name='close' defaultValue={data?.close} />

                        <label htmlFor='isPickup'>isPickup: </label>
                        <input disabled={iseditable} type="checkbox" onChange={(e) => {
                            handleChange('isPickup', e.target.checked)
                            // setIsPickup(e.target.checked) 
                        }} name='isPickup' checked={data?.isPickup} />

                        <label htmlFor='isDelivery'>isDelivery: </label>
                        <input disabled={iseditable} type="checkbox" onChange={(e) => {
                            handleChange('isDelivery', e.target.checked)
                            // setIsDelivery(e.target.checked) 
                        }} name='isDelivery' checked={data?.isDelivery} />
                    </div>
                    <div className="media-body-rest">
                        <label htmlFor='location'>Location:</label>

                        <label htmlFor='street'>Street:</label>
                        <input disabled={iseditable} name='street' onChange={(e) => {
                            handleChange('street', e.target.value)
                            //  setStreet(e.target.value) 
                        }} defaultValue={data?.street} />
                        <label htmlFor='city'>City:</label>
                        <input disabled={iseditable} name='city' onChange={(e) => {
                            handleChange('city', e.target.value)
                            //  setCity(e.target.value) 
                        }} defaultValue={data?.city} />
                        <label htmlFor='state'>State:</label>
                        <input disabled={iseditable} name='state' onChange={(e) => {
                            handleChange('state', e.target.value)
                            // setState(e.target.value) 
                        }} defaultValue={data?.state} />
                        <label htmlFor='country'>Country:</label>
                        <select disabled={iseditable} type="country" onChange={(e) => {
                            handleChange('country', e.target.value)
                            // setCountry(e.target.value) 
                        }} name='country' defaultValue={data?.country} >
                            {/* <option value>}</option> */}
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                        </select>
                        <label htmlFor='zipcode'>Zipcode:</label>
                        <input disabled={iseditable} name='zipcode' onChange={(e) => {
                            handleChange('zipcode', e.target.value)
                            // setZipcode(e.target.value) 
                        }} defaultValue={data?.zipcode} />

                        <label htmlFor='phoneno'>Phone No:</label>
                        <input disabled={iseditable} name='phoneno' onChange={(e) => {
                            handleChange('phoneno', e.target.value)
                            // setPhoneNo(e.target.value) 
                        }} defaultValue={data?.phoneno} />

                        <p className="mb-5"></p>
                        {editSaveButton}
                    </div>





                </div>

            </div>

        </div>
    )

}

export default RestDetails
