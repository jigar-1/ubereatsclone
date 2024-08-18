import axios from 'axios';
import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addItemToCart, modalToggle, removeItemFromCart, setNewOrderItem, setNewRest } from '../../redux/user/Cart/CartActions';
import API_BASE_URL from '../../utils/constants';
import DishAddDel from './common/DishAddDel';


const GridDish = (props) => {
    const [dishes, setDishes] = useState([]);
    // const dispatch = useDispatch()
    const restId = props.restId;

    // const restData = useSelector(state => state.restGrid.restaurants);
    // const cart = useSelector(state => state.cart)

    // const restName = restData.find(
    //     item => item._id == restId
    // ).name;



    // console.log(restName);

    const fetchCurrentRestDishes = () => {
        axios.get(`${API_BASE_URL}/dishesbyRest/${restId}`)
            .then(result => {
                console.log("dishes", result.data)
                setDishes(result.data)
            })
    }

    useEffect(() => {

        fetchCurrentRestDishes()

    }, [])

    // const newRest = { restId, restName }
    // const handleAddItem = e => {
    //     // console.log("new Rest", newRest.restId)
    //     // console.log("current rest", cart.currentRest)
    //     dispatch(setNewRest(newRest))
    //     dispatch(setNewOrderItem(e.target.value))


    //     if (cart.currentRest.restId == undefined || cart.currentRest.restId == newRest.restId) {
    //         dispatch(addItemToCart(e.target.value, newRest))
    //     }
    //     else {
    //         //show modal 
    //         dispatch(modalToggle(true))
    //     }


    // }
    // const handleDelItem = e => {
    //     console.log("EEE", e.target)
    //     dispatch(removeItemFromCart(e.target.value))
    // }


    return (
        <div className="container-fluid" >
            <div className="row">
                {
                    dishes.map(item => {
                        return (
                            <div className='col-4 ' style={{}} key={item.id}>
                                <div className="media" style={{ boxShadow: "3px 3px 10px silver", backgroundColor: 'white', overflow: 'hidden', height: '150px' }}>

                                    <img className="mr-4" style={{ overflow: 'hidden', width: '150px', height: '150px' }}
                                        src={item.image} alt="Generic" />
                                    <div className="media-body" style={{
                                        display: 'flex', flexDirection: 'column',
                                        justifyContent: 'space-evenly',
                                    }} >
                                        <div style={{ overflow: 'hidden' }}>

                                            <div style={{ overflow: 'hidden' }}><h5 className="mt-0">{item.name}</h5></div>
                                            <div style={{ height: '60px', overflow: 'hidden' }}><p >{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="dish-footer">
                                            <b >${item.price}</b>

                                            <DishAddDel item={item} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </div >
    )
}

export default GridDish
