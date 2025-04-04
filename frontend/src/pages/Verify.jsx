import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems, backednUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const varifyPayment = async()=>{

        try {

            if(!token){
                return null;
            }

            const response = await axios.post(
                backednUrl + '/api/order/verifyStripe',
                {orderId, success},
                {headers: {token}}
            );

            if(response.data.success){
                setCartItems({});
                navigate('/orders')
            }else{
                navigate('/cart');
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
            
        }
        
    }

    useEffect(()=>{
        varifyPayment();
    },[token])

return (
    <div>Verify Payment</div>
)
}

export default Verify