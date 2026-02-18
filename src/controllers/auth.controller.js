import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// User Register Route

    const registerUser = async (req,res) =>{
// extract user data from the body. 
// if data send through the parameter - user req.params 

        const {username, email, password, role = "user"} = req.body;

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

// convert normal password to hash password 
        const hash = await bcrypt.hash(password, 10);

// create user in DB
        const user = await userModel.create({
            username,
            email,
            password : hash,
            role
        });

// create a token using jwt sign method. 
// sign method accept atleat one unique value of user + extra one info - optional or common info. 
        const token = jwt.sign(
            {   id : user._id,  role: user.role }, 
            process.env.JWT_SECRET, {expiresIn:"1D"} 
        );

// .cookie method to set token in browser cookie storage. 
        res.cookie("token", token)


// and last return the user information and don't pass the credential information - like password, account number etc. 
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id: user._id,
                username : user.username,
                email : user.email,
                role : user.role,
            }
        })

    };

// User Login Route

    const loginUser = async (req,res) =>{
// extract data from the body. 
        const {username, email, password} = req.body;

// 1st check the user is available in DB. if not return error sms.
        const user = await userModel.findOne({
            $or : [
                {username},
                {email}
            ]
        });

// user not exit - return error sms. 
        if(!user) { 
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

// check password. user send a password compare the password === DB.stored password. 
// using the bcrypt.compare() method. pass extracted password , user.password -stored in DB 

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

// Generate Token after passs and user is valid, using jwt.sign() method. it's accept one unique value + 2ndary value - optionl 
// and jwt secret key. 

        const token = jwt.sign({
            id : user._id,
            role : user.role
        }, process.env.JWT_SECRET);

// set token into the browser cookie stroage. 
        res.cookie("token", token);

// return the user information. don't return credential information.
        res.status(200).json({
            message:"User logged in successfully",
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        });

    };





// exporting router function (logic) in router folder to access the router logic according to the req. 
export default {registerUser, loginUser};