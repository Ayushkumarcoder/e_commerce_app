

// add product to user cart

import userModel from "../models/userModel.js";

// const addToCart = async (req, res)=>{

//     try {

//         const {userId, itemId, size} = req.body;


// // to find the user using the user ID
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;

//         if(cartData[itemId]){
//             if(cartData[itemId][size]){
//                 cartData[itemId][size] += 1;
//             }else{
//                 cartData[itemId][size] = 1;
//             }
//         }else{
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1;
//         }

//         await userModel.findByIdAndUpdate(userId, {cartData});
//         res.json({success: true, message: "Product added to cart"});

        
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }

// }




const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Check if all required fields are present
        if (!userId || !itemId || !size) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: userId, itemId, or size" 
            });
        }

        // Find the user using the user ID
        const userData = await userModel.findById(userId);
        
        // Check if user exists
        if (!userData) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Initialize item in cart if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Initialize size in item if it doesn't exist
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }

        // Increment the quantity
        cartData[itemId][size] += 1;

        // Update the user's cart data
        await userModel.findByIdAndUpdate(userId, { cartData });
        
        res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};







//update user Cart

const updateCart = async (req, res)=>{

    try {

        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Cart Updated"});

        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }


}

//get user cart data

const getUserCart = async (req, res)=>{

    try {

        const {userId} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }

}

export {addToCart, updateCart, getUserCart}