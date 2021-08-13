const express = require('express')
const userRouter = express.Router();
const authenticate = require('../middleware/authenticate');



// Getting DataBase
require('../db/connection.js');

// Getting UserSchema
const User = require('../model/userSchema.js')

// Getting Post Schema
const Post = require('../model/postSchema.js')


  

userRouter.get('/user/:userId' , async (req ,res)=>{

    const {userId} = req.params

    

   try {
       
        const findUser = await User.findOne({_id:userId}).select("-password");

        if(findUser){

            const UserPosts = await Post.find({postedBy:userId}).populate("postedBy" , "_id , Fullname , Username")
        
            res.json({findUser , UserPosts })
        
        }else{
            console.log("User Not Found")
        }


   } catch (error) {
       console.log(error)
   }

})


userRouter.put('/follow', authenticate , async (req,res)=>{

    const {userId} = req.body;

    const myUserId = req.userID;

   try {

    const findUserAndFollow = await User.findByIdAndUpdate( {_id:userId} ,{
        $push:{ 
            followers:myUserId
        }
    })

    if(findUserAndFollow){

        
        const myProfile = await User.findByIdAndUpdate({ _id:myUserId } ,{
            $push:{ 
                following:userId
            }
        })


        const user = await User.findOne({_id:userId}).select("-password");

        res.json({user})
    }

   } catch (err){
       console.log(err)
   }

})



userRouter.put('/unfollow', authenticate , async (req,res)=>{

    const {userId} = req.body;

    const myUserId = req.userID;

   try {

    const findUserAndUnFollow = await User.findByIdAndUpdate( {_id:userId} ,{
        $pull:{ 
            followers:myUserId
        }
    })

    if(findUserAndUnFollow){

        
        const myProfile = await User.findByIdAndUpdate({ _id:myUserId } ,{
            $pull:{ 
                following:userId
            }
        })


        const user = await User.findOne({_id:userId}).select("-password");

        res.json({user})
    }

   } catch (err){
       console.log(err)
   }

})


userRouter.post('/checkfollow' ,authenticate , async (req,res)=>{
    
    const {userId} = req.body;

    const myUserId = req.userID;

    const findUser = await User.findOne({_id:userId , followers:myUserId })

    if(findUser){
        res.json(false)
    }
    else{
        res.json(true)
    }

}) 



userRouter.put('/adduserpic', authenticate , async (req, res)=>{

    const {url} = req.body

    const myUserId = req.userID;

    const findUser = await User.findByIdAndUpdate({_id:myUserId} ,{
        $push:{ 
            photo:url
        }
    })

    const savePost = await findUser.save();

    if(savePost){
        res.json(req.rootUser);
    }


} )



userRouter.put('/like' , authenticate , async (req , res)=>{

    const {postId} = req.body;
    const userId = req.userID;


    const likePost = await Post.findByIdAndUpdate({_id:postId},{
        $push:{ 
            likes:userId
        }
    })

    if(likePost){
         
        const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt');

        res.json({allPosts})
        
    }
    

} )

userRouter.put('/unlike' , authenticate , async (req , res)=>{

    const {postId} = req.body;
    const userId = req.userID;


    const UnlikePost = await Post.findByIdAndUpdate({_id:postId},{
        $pull:{ 
            likes:userId
        }
    })

    if(UnlikePost){

        const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt');

        res.json({allPosts})
    }
    

} )


userRouter.post('/searchuser' , authenticate ,async (req, res)=>{

    const {searchValue} = req.body;


    let userPattern = new RegExp("^"+searchValue);

    const users = await User.find({Fullname: {$regex:userPattern} })

    if(users){
        res.json({users})
    }

})



module.exports = userRouter;