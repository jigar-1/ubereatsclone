import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LandingTopNav from './common/LandingTopNav'
import cookie from 'react-cookies'
import { Redirect } from 'react-router';
import axios from 'axios';
import API_BASE_URL, { ACCESS_SECRET_KEY_ID, ACCESS_KEY_ID } from '../../utils/constants';
import S3FileUpload from 'react-s3';
import { fetchLocationSuccess, fetchUserLoginSuccess, fetchUserSuccess, updateCreds, updateCust, updateCustAdd, updateCustomerAdd } from '../../redux';


const config = {
    bucketName: 'uber-eats-proto',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: ACCESS_SECRET_KEY_ID
}


const UserProfile = () => {
    // const creds = useSelector(state => state.userCreds.credentials)
    const custData = useSelector(state => state.user.user)
    const custLoc = custData.addresses[0];

    const dispatch = useDispatch()

    // const currentUser = cookie.load('userId')
    // console.log(currentUser)

    const [dataCust, setDataCust] = useState();
    const [dataCustAdd, setDataCustAdd] = useState();
    // const [dataCustCred, setDataCustCred] = useState();
    const [iseditable, setEditable] = useState('disabled')

    useEffect(() => {
        setDataCust({ ...dataCust, ...custData })
    }, [custData])

    useEffect(() => {
        setDataCustAdd({ ...dataCustAdd, ...custLoc })
    }, [custLoc])

    // useEffect(() => {
    //     setDataCustCred({ dataCustCred, ...creds })
    // }, [creds])


    const handleCustChange = (key, value) => {
        setDataCust({ ...dataCust, [key]: value })
    }

    const handleCustAddChange = (key, value) => {
        setDataCustAdd({ ...dataCustAdd, [key]: value })
    }

    // const handleCustCredChange = (key, value) => {
    //     setDataCustCred({ ...dataCustCred, [key]: value })
    // }


    // console.log(creds)

    // console.log("custCred", dataCustCred)
    // console.log("custCred", dataCustCred)
    // const [name, setName] = useState(custData?.name);
    // const [dob, setDob] = useState(custData?.dob);
    // const [about, setAbout] = useState(custData?.about);
    // const [nickname, setNickname] = useState(custData?.nickname);
    // const [phoneno, setPhoneno] = useState(custData?.phoneno);
    // const [email, setEmail] = useState(creds?.email);
    // const [profilePic, setProfilePic] = useState(custData?.profilePic);
    // const [street, setStreet] = useState(custLoc?.street);
    // const [city, setCity] = useState(custLoc?.city);
    // const [state, setState] = useState(custLoc?.state);
    // const [country, setCountry] = useState(custLoc?.country);
    // const [zip, setZip] = useState(custLoc?.zip);



    const makeEditable = () => {
        setEditable('')
    }

    const makeUneditable = () => {
        setEditable('disabled')

        const cust = {
            email: dataCust.email,
            name: dataCust.name,
            dob: dataCust.dob,
            about: dataCust.about,
            nickname: dataCust.nickname,
            phoneno: dataCust.phoneno,
            profilePic: dataCust.profilePic,
        }
        const custAdd = {
            addressId: dataCustAdd._id,
            street: dataCustAdd.street,
            city: dataCustAdd.city,
            state: dataCustAdd.state,
            country: dataCustAdd.country,
            zipcode: dataCustAdd.zipcode
        }

        dispatch(updateCust(custData._id, cust))

        dispatch(updateCustomerAdd(custData._id, custAdd))




    }


    let update_save_button = null;
    if (iseditable === '') {
        update_save_button = (
            <button type="button" onClick={makeUneditable} className="btn btn-primary">Save</button>
        )
    }
    else {
        update_save_button = (
            <button type="button" onClick={makeEditable} className="btn btn-primary">Edit Details</button>
        )
    }



    const upload = (e) => {
        console.log(e.target.files[0])
        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then((data => {
                handleCustChange('profilePic', data.location)
            }))
            .catch(err => {
                alert(err)
            })

    }

    // let redirectVar = null;
    // if (!cookie.load('userId')) {
    //     redirectVar = <Redirect to="/" />
    // }

    return (
        <div>
            {/* {redirectVar} */}
            <LandingTopNav />
            <div className="profile-wrapper" style={{ paddingLeft: '10%' }}>
                <h1>Profile</h1>
                <div className="media">
                    <div className="image-upload-wrapper">
                        <img className="align-self-center mr-3" id="userProfilePic"
                            src={dataCust?.profilePic ? dataCust.profilePic : "https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1633856598&Signature=lSpJOB8FPhsETzDdvurU2A-pzltBIULUTX9RHYIYmMtzfHO-gCxqkqQY9cck9NlXRB5MHEBx0c9kUNV9nosyET-2Pti7zg8cwSmxpp-gO~uF1EJb6I1Zbu0Kj6NBGw2d1iq7-gqGf7wE6fVcGc9XO1BUwLvDE-v9x2oaCAA0bOhB4S8irUIToah6h4jnbY~VuNXKq0P76K0p2vsW-deqtVGc45Zxr~Wf4TV8yBVWIUy32Nulasja6kly06LcMfCAZ3EVAN10HxdNxIdsv4AwOLHxCZke3cCNdPnNas6dE0fMu9KlsMBlX03StvUyYVU3~DNxv0cMXr4ciSPOAVyAxg__&Key-Pair-Id=APKAJSDH2OZQQSA64LQQ"}
                            alt="DP" />

                        <input className="upload-btn" disabled={iseditable} type="file" onChange={upload} />
                    </div>
                    <div className="media-body">

                        <div className="media-body-rest">
                            <label htmlFor='name'>Name:</label>
                            <input disabled={iseditable} type="text" onChange={(e) => { handleCustChange('name', e.target.value) }} name='name' defaultValue={dataCust?.name} />

                            <label htmlFor='dob'>Date of Birth:</label>
                            <input disabled={iseditable} type="date" name='dob' onChange={(e) => { handleCustChange('dob', e.target.value) }} defaultValue={dataCust?.dob} />

                            <label htmlFor='bio'>Bio:</label>
                            <textarea disabled={iseditable} cols="50" rows="10" name='bio' onChange={(e) => { handleCustChange('about', e.target.value) }} defaultValue={dataCust?.about} />



                            <label htmlFor='email'>Email:</label>
                            <input disabled={iseditable} name='email' onChange={(e) => { handleCustChange('email', e.target.value) }} defaultValue={dataCust?.email} />

                            <label htmlFor='phoneno'>Phone No:</label>
                            <input disabled={iseditable} name='phoneno' onChange={(e) => { handleCustChange('phoneno', e.target.value) }} defaultValue={dataCust?.phoneno} />

                            <label htmlFor='nickname'>Nickname:</label>
                            <input disabled={iseditable} name='nickname' onChange={(e) => { handleCustChange('nickname', e.target.value) }} defaultValue={dataCust?.nickname} />
                        </div>
                        <div className="media-body-rest">
                            <label htmlFor='location'>Location:</label>

                            <label htmlFor='street'>Street:</label>
                            <input disabled={iseditable} name='street' onChange={(e) => { handleCustAddChange('street', e.target.value) }} defaultValue={dataCustAdd ? dataCustAdd.street : ""} />
                            <label htmlFor='city'>City:</label>
                            <input disabled={iseditable} name='city' onChange={(e) => { handleCustAddChange('city', e.target.value) }} defaultValue={dataCustAdd ? dataCustAdd.city : ""} />
                            <label htmlFor='state'>State:</label>
                            <input disabled={iseditable} name='state' onChange={(e) => { handleCustAddChange('state', e.target.value) }} defaultValue={dataCustAdd ? dataCustAdd.state : ""} />
                            <label htmlFor='country'>Country:</label>
                            <select disabled={iseditable} name='country' onChange={(e) => { handleCustAddChange('country', e.target.value) }} defaultValue={dataCustAdd ? dataCustAdd.country : ""} >

                                <option value="USA">USA</option>
                                <option value="India">India</option>
                                <option value="China">China</option>
                            </select>
                            <label htmlFor='zipcode'>Zipcode:</label>
                            <input disabled={iseditable} name='zip' onChange={(e) => { handleCustAddChange('zipcode', e.target.value) }} defaultValue={dataCustAdd ? dataCustAdd.zipcode : ""} />
                        </div>
                        <p className="mb-5"></p>
                        {update_save_button}

                    </div>


                </div>
            </div>

        </div>
    )
}

export default UserProfile

