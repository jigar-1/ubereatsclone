import React from 'react'
import RestProfile from './common/RestProfile'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import LandingTopNav from '../user/common/LandingTopNav'
import GridDish from '../user/GridDish'
// import CartModal from '../CartModal'

const RestMainPage = ({ match, location }) => {
    // console.log("MMATCH", match)
    return (
        <div>

            <LandingTopNav />
            <RestProfile restId={match.params.restId} />
            <GridDish restId={match.params.restId} />
        </div>
    )
}

export default RestMainPage
