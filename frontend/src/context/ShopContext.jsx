import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

//creating context api 

export const ShopContext = createContext();

//function that acts as atom to pass the values
const ShopContextProvider = (prop) =>{
    const currency = '$';
    const delivery_fee = 10; //variables with values which will be passed

    //connecting backend to frontend

    const backednUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);

    //for search 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    //for cart 
    const [cartItems, setCartItems] = useState({});

    //for login 
    const [token, setToken] = useState("");

    const addToCart = async(itemId, size) =>{

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        setCartItems(prevCartItems => {
            let cartData = { ...prevCartItems };
    
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = { [size]: 1 };
            }
            
            return cartData;
        });
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])


    const updateQuantity = async(itemId, size, quantity) =>{
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((products) => products._id === items);

            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    //now taking data form backedn

    const getProductsData = async()=>{
        try {
            
            const response = await axios.get(backednUrl + '/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
            }else{
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
        }
    })



    const value = {                  //this is the atom with the value which is being passed
        products , currency, delivery_fee, search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, 
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backednUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {prop.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
