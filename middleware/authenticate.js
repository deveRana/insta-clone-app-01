
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema.js');

const authenticate = async (req ,res ,next)=>{


    try{
        const token = req.cookies.jwtToken; 

        const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id:verifyToken._id , "tokens.token":token })

        if(!rootUser){
            console.log("User Not Found")
        }

        req.token = token; 
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({error:"NO Token Provided"});
    }

}

module.exports = authenticate;