
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import Axios from 'axios'
import { fetchRestaurants, filterRestaurantsDelivery } from '../redux'
import { addFavourite } from '../redux';
import fetchFavourite from '../redux/user/Favourite/FavouriteActions';

const Grid = () => {

    const restData = useSelector(state => state.restGrid.restaurants);


    const isPickup = useSelector(state => state.restGrid.isPickup);
    const isDelivery = useSelector(state => state.restGrid.isDelivery);
    const searchText = useSelector(state => state.restGrid.searchText);
    const dishText = useSelector(state => state.restGrid.dishRestIds);
    const typeFilter = useSelector(state => state.restGrid.typeRestIds);
    const custData = useSelector(state => state.user.user)
    const custLoc = custData.addresses;
    const favData = useSelector(state => state.favourites.favourite)


    console.log(isPickup, isDelivery, searchText)
    console.log("REST DATA:", restData)
    console.log("CUST DATA:", custLoc)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRestaurants(custLoc ? custLoc[0].city : " "))
    }, [custLoc]);




    const handleClickFav = (restId) => {

        let isFav = false;
        console.log("clicked rest", restId)
        favData.map(item => {
            console.log("III", item)
            if (item == restId)
                isFav = true;
        })

        const payload = {
            restId: restId,
            custId: custData._id
        }

        !isFav && dispatch(addFavourite(payload))
    }

    const isRestFav = (id) => favData.some(item => item == id)





    const filteredData = restData.filter(val1 => {
        if (isPickup === 1 && isPickup == val1.isPickup)
            return val1;
        if (isDelivery === 1 && isDelivery == val1.isDelivery)
            return val1;
    })

    console.log("FF", filteredData)



    const secondfilter = (filteredData.length ? filteredData.filter(val => {
        if ((
            searchText === "" ||
            val.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
            val.street.toLowerCase().startsWith(searchText.toLowerCase()) ||
            val.city.toLowerCase().startsWith(searchText.toLowerCase()) ||
            val.country.toLowerCase().startsWith(searchText.toLowerCase()) ||
            dishText.includes(val._id))
        ) {
            return val
        }
    }) : restData)

    console.log("SF", secondfilter)



    const thirdfilter = (typeFilter.length ? secondfilter.filter(val => {
        if (typeFilter.includes(val._id))
            return val;
    }) : secondfilter)



    console.log("TF", thirdfilter)
    return restData.loading ? (
        <h2>Loading...</h2>
    ) : restData.error ? (
        <h2>{restData.error}</h2>
    ) : (
        <div>

            <h1 style={{ marginBottom: '50px' }}>Restaurants</h1>
            <div className="container-fluid" >
                <div className="row">
                    {
                        thirdfilter.map(item => {

                            return (
                                <div className="col-4" key={item._id} >
                                    <div className="grid-item-wrapper" style={{ backgroundColor: '#eeeeee', marginBottom: '5px', boxShadow: "3px 3px 10px silver" }}>
                                        <Link to={`/restMain/${item._id}`}>
                                            <div className="card-img" >
                                                <img className="card-img-top"
                                                    style={{ objectFit: 'cover', width: '100%', height: '100px' }}
                                                    src={item.image} alt="Card cap" />

                                            </div>
                                        </Link>
                                        <div className="card-body">
                                            <div>
                                                <p style={{ fontSize: '18px', fontWeight: '500', height: '40px', overflow: 'unset' }} className="card-text" >{item.name}</p>
                                                <hr />
                                                <p style={{ fontSize: '14px', fontWeight: '500', height: '20px', overflow: 'unset' }} className="card-text" >{item.city}</p>
                                            </div>
                                            <button style={{ backgroundColor: '#06c167', color: 'white' }} type="button"
                                                className="fav-btn" onClick={() => handleClickFav(item._id)}>
                                                {isRestFav(item._id) ? "Liked!" : "Like"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )

}

export default Grid
