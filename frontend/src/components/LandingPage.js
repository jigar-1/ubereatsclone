import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Grid from './Grid';
import LandingTopNav from './user/common/LandingTopNav';
import Filters from './Filters';

import cookie from 'react-cookies';
import { Redirect } from 'react-router'

const LandingPage = () => {

    let redirectVar = null;
    // if (!cookie.load('userId')) {
    //     redirectVar = <Redirect to="/userSignIn" />
    // }
    if (!localStorage.getItem('token')) {
        redirectVar = <Redirect to="/userSignIn" />
    }


    return (
        <div className="content-grid">
            {redirectVar}

            <LandingTopNav />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Filters />
                    </div>
                    <div className="col-10">
                        <Grid />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingPage
