import React from 'react'
import RestSideNav from './common/RestSideNav'
import RestTopNav from './common/RestTopNav'
import RestOrdersList from './RestOrdersList'
import RestOrdersTopFilter from './RestOrdersTopFilter'

const RestOrders = () => {


    return (
        <div className='wrappper'>
            <RestTopNav />

            <div className='rest-content'>
                <RestSideNav Home='' Menu='' Orders='active' />

                <div className='nav-content'>

                    <RestOrdersList />
                </div>

            </div>

        </div>
    )
}

export default RestOrders
