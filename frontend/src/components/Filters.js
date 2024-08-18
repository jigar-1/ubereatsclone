import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRestIdFromType } from '../redux'
import API_BASE_URL from '../utils/constants'

const Filters = () => {
    const [isVeg, setIsVeg] = useState(false)
    const [isNonVeg, setIsNonVeg] = useState(false)
    const [isVegan, setIsVegan] = useState(false)

    const dispatch = useDispatch()

    const _getRestIdFromType = async (e) => {

        let payload = {
            veg: isVeg,
            nonVeg: isNonVeg,
            vegan: isVegan
        }
        console.log("NAME:", e.target.name)
        console.log("CHECKED:", e.target.checked)
        switch (e.target.name) {
            case 'Veg': {
                payload = { ...payload, veg: !isVeg }
                setIsVeg(!isVeg);
                break;
            }
            case 'NonVeg': {
                payload = { ...payload, nonVeg: !isNonVeg }
                setIsNonVeg(!isNonVeg);
                break;
            }
            case 'Vegan': {
                payload = { ...payload, vegan: !isVegan }
                setIsVegan(!isVegan);
                break;
            }


            default: console.log("all selected")
        }

        console.log("isVeg", isVeg)
        console.log("isNonVeg", isNonVeg)
        console.log("isVegan", isVegan)

        const response = await axios.get(`${API_BASE_URL}/getRestIdsFromType/`, { params: payload })

        console.log("Rest Ids:", response.data)
        dispatch(getRestIdFromType(response.data))
    }

    return (
        <div style={{ backgroundColor: "#eeeeee", paddingLeft: "10px", paddingTop: "5px", height: "100vh" }}>
            <h5> Dietary:</h5>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="Veg" onChange={_getRestIdFromType} id="Veg" />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Veg
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="NonVeg" onChange={_getRestIdFromType} id="NonVeg" />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Non-Veg
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="Vegan" onChange={_getRestIdFromType} id="Vegan" />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Vegan
                </label>
            </div>
        </div>
    )
}

export default Filters
