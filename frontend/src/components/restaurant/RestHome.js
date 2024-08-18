import React from 'react'
import Button from '../Button'
import RestProfile from './common/RestProfile'
import RestSideNav from './common/RestSideNav'
import RestTopNav from './common/RestTopNav'
import RestDetails from './RestDetails'

const RestHome = () => {




    return (
        <div className='wrappper'>

            <RestTopNav />

            <div className='rest-content'>
                <RestSideNav Home='active' Menu='' Orders='' />

                <div className='nav-content'>
                    <h1> Profile </h1>
                    <RestDetails />

                </div>

            </div>

        </div>
    )
}

export default RestHome
