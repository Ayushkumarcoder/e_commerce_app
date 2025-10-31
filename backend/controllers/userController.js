import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderSchema from "../models/orderModel.js";

//creating the token 

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

//route for user login

const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        
        //checking if user exist
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            console.log("token",token);
            res.json({success: true, token});

        }else{
            res.json({success: false, message: "Invalid credentials"});
        }


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


//route for user sign up

const registerUser = async(req, res) =>{
    try {
        
        const {name, email, password} = req.body;

        // cheking if user already exist

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message: "User already exist"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false, message: "Please enter a strong password"});
        }
        
        //hashing user password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        //returning the token 
        const token = createToken(user._id);
        res.json({success: true, token})
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// const getAllOrders = async(req, res) => {
//     try{
//         const orders = await orderSchema.findById(req.params.id);
//         res.json({success: true, orders});  


//     }
//     catch(error){
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }   
// }
//route for admin login

const adminLogin = async(req, res) => {

    try {

        const {email, password} = req.body;

        //checking if user is admin

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token});
        }else{
            res.json({success: false, message: "Invalid Credentital for admin"});
        }
        
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

export {loginUser, registerUser, adminLogin,getAllOrders}