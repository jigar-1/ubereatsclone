import React, { useEffect, useState } from 'react'
import LandingTopNav from './common/LandingTopNav'
import Grid from '../Grid'

import cookie from 'react-cookies';
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import fetchFavourite, { fetchFavouriteSuccess, delFavourite } from '../../redux/user/Favourite/FavouriteActions';
import { Link } from 'react-router-dom';
const FavouritesPage = () => {
    const [data, setData] = useState([]);
    const restData = useSelector(state => state.restGrid.restaurants);
    // console.log(restData)
    const custData = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const favData = useSelector(state => state.favourites.favourite)


    console.log("FAV: ", favData)
    const fetchCustFavourites = () => {
        try {
            dispatch(fetchFavourite(custData._id))

            setData(favData)
        }
        catch {
            console.log("fetch error")
        }
    }

    useEffect(() => {
        fetchCustFavourites();
    }, []);

    const handleClickUnlike = (id) => {
        console.log("restid", id)
        dispatch(delFavourite(id, custData._id))
    }

    // let redirectVar = null;
    // if (!cookie.load('userId')) {
    //     redirectVar = <Redirect to="/userSignIn" />
    // }

    return (
        <div>
            {/* {redirectVar} */}
            <LandingTopNav />
            <div className="Fav-wrapper">
                <h1 style={{ marginBottom: '50px' }}>Favourites</h1>
                <div className="container-fluid" >
                    <div className="row"></div>
                    {
                        favData.map(item =>
                            restData.filter(rest => rest._id === item).map(fdata => {
                                console.log("fav items:", fdata)
                                return (
                                    <div className="col-3" key={item._id} style={{ backgroundColor: '#eeeeee', marginBottom: '5px', boxShadow: "2px 2px 15px" }} >
                                        <div className="grid-item-wrapper">
                                            <Link to={`/restMain/${item.restId}`}>
                                                <div className="card-img" >
                                                    <img className="card-img-top" value={item.id} style={{ objectFit: 'cover', width: '100%', height: '100px' }} src={fdata.image} alt="Card cap" />
                                                </div>
                                            </Link>
                                            <div className="card-body">
                                                <p style={{ fontSize: '18px', fontWeight: '500' }} className="card-text" value={item} >{fdata.name}</p>

                                                <button type="button" style={{ outline: 'none', cursor: 'pointer', border: 'none', backgroundColor: 'red', color: 'white', fontWeight: '700' }} onClick={() => handleClickUnlike(item)} className="fav-btn" data-toggle="button">
                                                    Unlike
                                                    {/* <i class="bi bi-heart-fill"></i> */}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}



export default FavouritesPage


/*
<Link to={`/restMain/${item.id}`}>
                                            <div className="card-img" >
                                                <img className="card-img-top"
                                                    style={{ objectFit: 'cover', width: '100%', height: '100px' }}
                                                    src={item.image} alt="Card cap" />

                                            </div>
                                        </Link>
                                        */