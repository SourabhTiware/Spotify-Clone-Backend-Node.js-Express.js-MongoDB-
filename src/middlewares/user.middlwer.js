import userModel from "../models/user.model.js";

const registerUser = async (req,res,next) =>{
    // extract user data from the body. 
// if data send through the parameter - user req.params 

        const {username, email} = req.body;

// first check user is exist or not. 
        const isUserAlreadyExists = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        });

// if exist return user already exists
        if(isUserAlreadyExists){
            return res.status(409).json({
                message:"User already exists"
            })
        };

        next();
}

export default {registerUser};