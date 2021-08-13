const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const nodemailer = require('nodemailer');
const sendgridtranport = require('nodemailer-sendgrid-transport');


// Creating Email Tranporter
// const tranporter = nodemailer.createTransport(sendgridtranport({
//     auth:{
//         api_key:process.env.API_KEY
//     }
// }))


// Getting DataBase
require('../db/connection.js');

// Getting UserSchema
const User = require('../model/userSchema.js')



router.get('/getData' , authenticate ,(req,res)=>{
    res.json(req.rootUser);
})


router.get('/logout' , authenticate ,(req,res)=>{
    res.clearCookie("jwtToken");
    res.status(200).json({message:"Logout Successfull"})

})

router.post('/login' , async (req , res)=>{


    let token;

    const {emailPhone , password} = req.body;

    if(!emailPhone || !password){
        console.log("PLEASE FILL EVERY INPUT FIELD")
        return res.status(422).json( {error:"PLEASE FILL EVERY INPUT FIELD"} )
    }

    try{

        const userExist = await User.findOne({emailPhone:emailPhone});

        if(!userExist){

            return res.status(403).json({error:"Check Email and Password Again"})
        
        }else{
            const passwordMatch = await bcrypt.compare(password , userExist.password);

            if(passwordMatch){ 

                
                token = await userExist.generateToken();
            
                res.cookie('jwtToken' , token , {
                    expire: (new Date() + 86400000) ,
                    httpOnly:true
                })              

                return res.status(200).json({token})

            }else{                
                return res.status(422).json("Check Email and Password Again")
            }
        }


    }catch(err){
        console.log(err)
    }

})


router.post('/register', async (req,res)=>{


    const { emailPhone,Fullname,Username,password  } = req.body

    if(!emailPhone || !Fullname || !Username || !password){
        console.log("PLEASE FILL EVERY INPUT FIELD")
        return res.status(422).json( {error:"PLEASE FILL EVERY INPUT FIELD"} )
    }
    
    try{

        const userExist = await User.findOne({emailPhone:emailPhone});

        if(userExist){
            return res.status(403).json( {error:"User Already Exists"} )
        }
        else{

            const fullNameTaken = await User.findOne({Fullname:Fullname})

            if(fullNameTaken){
               return res.status(404).json( {error:"Full Name Taken"} )
            }
            else{
                const user =  new User({emailPhone,Fullname,Username,password })

            // Hashing The Password

                const userRegister = await user.save();

                if(userRegister){
                    // tranporter.sendMail({
                    //     to:emailPhone,
                    //     from:"no-reply@insta.com",
                    //     subject:"Registration Succesfull",
                    //     body:"Welcome"
                    //     // html:"<h1> Welcome to Instagram </h1>"
                    // })
                    res.status(200).json({message:"Registration Succesfull"});
                }
            }
        }

    }catch(err){
        console.log("Registration Error")
        console.log(err)
    }

   

})

module.exports = router;