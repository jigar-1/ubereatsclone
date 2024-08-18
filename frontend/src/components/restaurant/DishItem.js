import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cookie from 'react-cookies'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../utils/constants';
const DishItem = (props) => {

    const [data, setData] = useState([]);

    const restData = useSelector(state => state.rest.rest)

    const fetchDishes = () => {
        axios
            .get(`${API_BASE_URL}/dishesbyRest/${restData._id}`)
            .then(result => {
                console.log("fetched dishes", result)
                setData(result.data)
            });

    }
    useEffect(() => {

        fetchDishes()

    }, []);

    const deleteItem = (itemId) => {
        console.log(itemId)
        axios.delete(`${API_BASE_URL}/dishes/${restData._id}/${itemId}`)
            .then(result => {
                console.log(result)
                fetchDishes()
            })
    }
    return (
        <>
            {
                data?.map(item => (


                    < div className="item-holder" key={item._id}>

                        <ul className="list-unstyled">
                            <li className="media">
                                <div className="dish-img-wrapper">
                                    <img className="mr-3" src={item.image} alt="Generic placeholder" />
                                </div>
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">{item.name}</h6>
                                    <p>Category: {item.category}</p>
                                    <p> Price : $ {item.price}</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                    <Link to={`/dishItem/${item._id}/edit`}>
                                        <button style={{ width: '100px', marginBottom: '5px' }} type="button" className="btn btn-primary"
                                        >
                                            Edit Item</button>
                                    </Link>
                                    <button style={{ width: '100px' }} type="button" className="btn btn-primary" onClick={() => {
                                        deleteItem(item._id)
                                    }
                                    }> Delete</button>

                                </div>
                            </li>
                        </ul>
                    </div >
                )

                )
            }
        </>
    )
}
export default DishItem
