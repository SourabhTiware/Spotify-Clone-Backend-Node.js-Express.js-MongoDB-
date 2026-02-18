import mongoose from "mongoose";

// Schema 
    const userSchema = new mongoose.Schema({
        
        username:{
            type:String,
            unique:true,
            required:true,
        },
        
        email:{
            type:String,
            required:true,
            unique:true,
        },

        password:{
            type:String,
            required:true,
        },

        role:{
            type:String,
            enum:["user", "artist"],
            default:"user",
        }

    });


// Create Collection

// user is collection name. mongodb automatic create user name in pural. user => users. 

    const userModel = mongoose.model("user", userSchema); 
    

    export default userModel;


