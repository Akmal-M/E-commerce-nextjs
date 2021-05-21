import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import OrderDetail from '../../components/OrderDetail'
import {CgArrowLongLeft} from "react-icons/cg";


const DetailOrder = () => {
    const {state, dispatch} = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])

    if(!auth.user) return null;
    return(
        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>

            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <CgArrowLongLeft/> Go Back
                </button>
            </div>

            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />

        </div>
    )
}

export default DetailOrder