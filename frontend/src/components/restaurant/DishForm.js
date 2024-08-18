import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API_BASE_URL, { ACCESS_SECRET_KEY_ID, ACCESS_KEY_ID } from '../../utils/constants';
import S3FileUpload from 'react-s3';


const config = {
    bucketName: 'uber-eats-proto',
    dirName: 'restaurants/dishes/', /* optional */
    region: 'us-east-2',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: ACCESS_SECRET_KEY_ID
}
const DishForm = (props) => {

    // const {isEdit}=props;

    const isEdit = (props.dishId !== 'dish')
    console.log("Is EDIT value:", isEdit)
    const [dishData, setDishData] = useState({})
    const restData = useSelector(state => state.rest.rest)

    useEffect(() => {
        if (isEdit) {
            axios.get(`${API_BASE_URL}/dishes/${restData._id}/${props.dishId}`)
                .then(res => {


                    console.log(res.data)
                    setDishData(res.data)
                })
        }

    }, [])

    const handleChange = (key, value) => {
        setDishData({ ...dishData, [key]: value })
    }


    const history = useHistory();

    const data = { ...dishData, restId: restData._id }

    const editItem = (e) => {
        e.preventDefault();
        console.log("item updated!")
        axios
            .put(`${API_BASE_URL}/dishes/${restData._id}/${props.dishId}`, dishData)
            .then((res) => {
                console.log(res)
                history.push('/restMenu')
            })
    }

    const addItem = (e) => {


        e.preventDefault();
        console.log("item created!")
        axios
            .put(`${API_BASE_URL}/addDish`, data).then((res) => {
                console.log(res)
                history.push('/restMenu')
            })

    }
    const upload = (e) => {
        console.log(e.target.files[0])
        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then((data => {
                handleChange('image', data.location)
            }))
            .catch(err => {
                alert(err)
            })

    }

    return (
        <form style={{ display: "flex" }} method="post" onSubmit={isEdit ? editItem : addItem}>
            <div>

                <div className="image-upload-wrapper">
                    <img className="rest-image-wrapper" style={{ objectFit: ' cover', width: '200px', height: '200px' }}
                        src={data.image ? data.image : "https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png"}
                        alt="DP" />
                    <input style={{ marginTop: "15px", paddingLeft: "50px" }} type="file" onChange={upload} />
                </div>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="dishName">Dish Name</label>
                    <input type="text" className="form-control" id="dishName" value={dishData?.name} onChange={(e) => { handleChange('name', e.target.value) }} placeholder="Chicken Burger" required />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient</label>
                    <input type="text" className="form-control" id="ingredient" value={dishData?.ingredient} onChange={(e) => { handleChange('ingredient', e.target.value) }} placeholder="Chicken Patty" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" value={dishData?.description} onChange={(e) => { handleChange('description', e.target.value) }} placeholder="About the dish" required />
                </div>
                <div className="form-row">

                    <div className="form-group col-md-4">
                        <label htmlFor="price">Price ($)</label>
                        <input step={0.01} type="number" className="form-control" onChange={(e) => {
                            handleChange(
                                'price', e.target.value)
                        }} id="price" value={dishData?.price} required />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="category">Category</label>
                        <select id="category" onChange={(e) => { handleChange('category', e.target.value) }} value={dishData?.category} className="form-control" required >
                            <option value>Choose...</option>
                            <option>Appetizer</option>
                            <option>Salads</option>
                            <option>Main Course</option>
                            <option>Desserts</option>
                            <option>Beverages</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Type">Type</label>
                        <select id="category" onChange={(e) => { handleChange('type', e.target.value) }} value={dishData?.type} className="form-control" required>
                            <option value>Choose...</option>
                            <option>Veg</option>
                            <option>Non-Veg</option>
                            <option>Vegan</option>
                        </select>
                    </div>


                    {/* <div className="form-group">
                    <label htmlFor="img-dish">Image</label>


                    <textarea className="form-control" id="img-dish" onChange={(e) => { handleChange('image', e.target.value) }} value={dishData?.image} placeholder="Image" />
                </div> */}
                    {/* <div className="custom-file">
                    <input type="text" className="custom-file-input" onChange={(e) => { setDishImage(e.target.value) }} id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div> */}
                </div>

                <button type="submit" className="btn btn-primary" > Save Item</button>
            </div>
        </form>

    )
}

export default DishForm
