import React from 'react'
import { useSelector } from 'react-redux';

const RestProfile = (props) => {
    // console.log(restid)
    const restData = useSelector(state => state.restGrid.restaurants);

    const [curRest] = restData.filter(r => r._id == props.restId)


    console.log("current", curRest)
    // console.log("restId type", typeof props.restId)
    return (


        <div className="container-fluid">
            <div className="card mb-4" style={{ boxShadow: "3px 3px 10px silver", width: "100%" }}>


                <div className='cover-box'>
                    <img className="card-img-top" src={curRest?.image} alt="Card_cap" />
                    <h1 style={{ position: 'absolute', top: '25%', left: '1%', color: 'white', textShadow: ' 2px 2px 4px black' }}>{curRest?.name} </h1>
                </div>
                <div className="">
                    {/* <h5 className="card-title">Restaurant Name : {curRest.name}</h5> */}
                    <p className="details-set">Description: {curRest?.about}</p>
                    <p className="details-set">Location : {curRest?.street}, {curRest?.city}, {curRest?.state}, {curRest?.country}, {curRest?.zipcode}</p>
                    <p className="details-set"><small className="text-muted" style={{ fontWeight: '700' }}>Phone number: {curRest?.phoneno}</small></p>
                    <p className="details-set"><small className="text-muted" style={{ fontWeight: '700' }}>Timings: {curRest?.open} - {curRest?.close}</small></p>

                </div>
            </div>
        </div>

    )
}

export default RestProfile
