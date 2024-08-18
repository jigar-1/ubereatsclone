import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import cookie from 'react-cookies'
import axios from 'axios';
import CustomerDetailsModal from './CustomerDetailsModal';
import RestOrdersTopFilter from './RestOrdersTopFilter'
import API_BASE_URL from '../../utils/constants';
import SingleOrder from './SingleOrder';

const RestOrdersList = () => {

    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState('')
    const [custShow, setCustShow] = useState(false)
    const [custDetails, setCustDetails] = useState()
    const restData = useSelector(state => state.rest.rest)
    const [pageLimit, setPageLimit] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState('All Orders');
    const [pageIcons, setPageIcons] = useState([]);

    const fetchOrders = async (orderFilter = "All Orders", pageLimit = 5, pageNumber = 1) => {
        console.log("T:", orderFilter)

        let payload = {
            orderFilter,
            pageLimit,
            pageNumber
        }

        const orderRes = await axios.get(`${API_BASE_URL}/ordersRest/${restData._id}`, { params: payload })

        console.log("payload:", orderFilter, pageLimit, pageNumber)

        setOrderData(orderRes.data)

        if (orderRes.status === 200) {

            if (parseInt(pageNumber) === 1) {
                console.log("HERE")
                console.log(orderFilter)

                const payload2 = {
                    orderFilter
                }
                console.log(payload2)

                const count = await axios.get(`${API_BASE_URL}/ordersRestCount/${restData._id}`, { params: payload2 })
                console.log(count.data.length)
                let numberOfPages = Math.ceil(count.data.length / pageLimit);
                console.log("Pages", numberOfPages)
                let pageList = [];

                for (let i = 1; i <= numberOfPages; i++) {
                    pageList.push({
                        pageNumber: i,
                        isSelected: (i === 1 ? true : false)
                    })
                }

                setPageIcons(pageList)
            }
        }
    }

    useEffect(() => {
        fetchOrders()
    }, []);


    const custDetailsHandler = (item) => {
        console.log("RECEIPT NO", item)
        setCustShow(true)
        setCustDetails(item)
    }

    // let pages = orderData.length / pageLimit;
    // alert(pages)
    const paginationHandler = (e) => {
        console.log("SELECTED:", e.target.text)
        setPageNumber(e.target.text);
        pageIcons.forEach((i) => {
            i.isSelected = (i.pageNumber === parseInt(e.target.text) ? true : false)
        })

        fetchOrders(filter, pageLimit, e.target.text)
    }

    // const [pageLimit, setPageLimit] = useState(5)

    const handleLimitChange = async (e) => {
        console.log("SELECTED:", e.target.value)
        setPageLimit(e.target.value)
        fetchOrders(filter, e.target.value)
    }


    return (
        <div>
            <RestOrdersTopFilter fetchOrders={fetchOrders} pageLimit={pageLimit} handleLimitChange={handleLimitChange} />
            <ul className="list-group">
                {
                    orderData.length == 0 ? "NO DATA" : orderData.map(item => (

                        <SingleOrder
                            item={item}
                            fetchfunciton={() => fetchOrders()}
                            onCustNameClick={() => custDetailsHandler(item)}
                        />
                    )
                    )}
                <CustomerDetailsModal onClose={() => setCustShow(false)} custDetails={custDetails} show={custShow} />
                <p>
                    {error}
                </p>
            </ul >

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">

                    {pageIcons.map(i => {
                        console.log("mapping", i.pageNumber, i.isSelected)
                        let isActive = i.isSelected == true ? "page-item active" : "page-item";

                        return (<li className={isActive} ><a className="page-link" onClick={paginationHandler}>{i.pageNumber}</a></li>)
                    })}
                </ul>
            </nav>
        </div >
    )
}

export default RestOrdersList
