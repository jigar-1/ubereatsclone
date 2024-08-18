import React from 'react'
import FileUpload from '../FileUpload'
import LandingTopNav from './common/LandingTopNav'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

const UpdateUserDetails = () => {

    let redirectVar = null;
    if (!cookie.load('userId')) {
        redirectVar = <Redirect to="/userSignIn" />
    }
    return (
        <div>
            {redirectVar}
            <LandingTopNav />
            <FileUpload />
        </div>


    )
}

export default UpdateUserDetails
