import RestSideNav from './common/RestSideNav'
import RestTopNav from './common/RestTopNav'
import DishItem from './DishItem'
import React from 'react'

const RestMenu = (props) => {
    // const history = useHistory()
    const goToAddItem = () => {
        props.history.push('/dishItem/dish/add')

    }



    return (
        <div className='wrappper'>

            <RestTopNav />


            <div className='rest-content'>

                <RestSideNav Home='' Menu='active' Orders='' />

                <div className='nav-content'>
                    <div className='menu-add'>
                        <h1> Menu</h1>
                        <button type="button" className="btn btn-primary" onClick={goToAddItem} >Add Item</button>
                    </div>

                    <DishItem />

                </div>
            </div>

        </div >
    )
}

export default RestMenu
