

//route for user login

const loginUser = async(req, res)=>{

}


//route for user sign up

const registerUser = async(req, res) =>{
    try {
        
        const {name, email, password} = req.body;
        

    } catch (error) {
        
    }
}

//route for admin login

const adminLogin = async(req, res) => {

}

export {loginUser, registerUser, adminLogin}