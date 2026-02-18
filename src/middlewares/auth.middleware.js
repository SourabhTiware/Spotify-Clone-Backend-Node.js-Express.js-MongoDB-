import jwt from "jsonwebtoken"

const authArtist = (req,res,next) =>{

// extract token from the cookies storage. 
        const token = req.cookies.token;

// token is not available return unauthorized.

        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        try{
// verify token using jsw.verify method and this method accept token, jwt secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
// after decoding token, access the role of user. 
// while creating a token, I pass the user role also. and now I can access it from decoded token.

            if(decoded.role !== "artist"){
                return res.status(403).json({
                    message:"You don't have access to create an music"
                });
            }

                    req.user = decoded;
                    next();
        }
                    
        catch(err){
            console.log(err.message)
            res.status(401).json({message:"Unauthorized"})
        }
};


const authUser = (req,res,next) =>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized token"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({
                message:"you don't  have access"
            });
        }

        req.user = decoded;
        
    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message:"unauthroized"
        })
    }

    next();
}


export default {authArtist, authUser};