import React from 'react'
import { useRouteMatch } from 'react-router'
import RestSideNav from './common/RestSideNav'
import RestTopNav from './common/RestTopNav'
import DishForm from './DishForm'

const AddDishItem = (props) => {

    console.log(props)


    // console.log("match", match)
    return (

        <div className='wrappper'>

            <RestTopNav />


            <div className='rest-content'>

                <RestSideNav Home='' Menu='active' Orders='' />

                <div className='nav-content'>
                    <div className='menu-add'>
                        <h1> Add Item </h1>
                    </div>

                    <DishForm dishId={props.match.params.dishId} />

                </div>
            </div>

        </div >


    )
}

export default AddDishItem
