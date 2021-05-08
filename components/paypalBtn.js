import { useEffect, useRef, useContext } from 'react'
import {patchData, postData} from '../utils/fetchingData'
import {DataContext} from '../store/GlobalState'
import {updateItem} from '../store/Actions'

const PaypalBtn = ({total,address,mobile,state,dispatch}) => {
    const refPaypalBtn = useRef()
    const {cart, auth, orders} = state

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: order.total
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                dispatch({ type: 'NOTIFY', payload: {loading: true} })

                return actions.order.capture().then(function(details) {

                    postData('order', {address,mobile, cart, total}, auth.token)
                        .then(res => {
                            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

                            dispatch({type:'ADD_CART', payload:[]})
                            dispatch({type:'ADD_ORDERS', payload:[...orders, res.newOrder]})



                            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
                        })
                    // This function shows a transaction success message to buyer.
                });
            }
        }).render(refPaypalBtn.current);
    },[])

    return(
        <div ref={refPaypalBtn}></div>
    )
}

export default PaypalBtn