const express = require('express');
const postRouter  = express.Router();
const bcrypt  = require('bcryptjs');
const authenticate = require('../middleware/authenticate');


// Getting DataBase
require('../db/connection.js');

// Getting Post Schema
const Post = require('../model/postSchema.js')




postRouter.get('/allposts', authenticate , async (req, res)=>{
    

    try{

            const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt')

            if(allPosts){
                res.json({ allPosts})
            }

    }catch(err){
        console.log(err)
    }

})

postRouter.get('/allpostsbyfollowing', authenticate , async (req, res)=>{


    if(req.rootUser.following.length < 1){
        

            const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt')

            if(allPosts){
                res.json({ allPosts})
            }

       


    }else{
 
                const allPosts = await Post.find({postedBy: {$in:req.rootUser.following} }).populate('postedBy comments.commentBy')

                if(allPosts){
                    res.json({ allPosts})
                }

        
    
    }

})


postRouter.get('/myprofile', authenticate , async (req ,res)=>{

    try{

        const userPost = await Post.find({postedBy:req.userID}).populate('postedBy' , 'Fullname Username');

        if(userPost){
            res.status(200).json({userPost})
        }


    }catch(err){
        console.log(err)
    }

})


postRouter.get('/getUser' , authenticate , async (req , res)=>{

    const userId = req.userID;

    res.json({userId});

})

postRouter.post('/addpost', authenticate , async (req, res)=>{
    try{

    const { title , body ,  url } = req.body;

    if(!title || !body || !url){
        console.log("Please Fill Every Input Filled");
        res.status(422).json({error:"PLEASE FILL EVERY FILLED"})
    }

    // console.log(req.userID);

    

        const post = new Post({title , body , photo:url , postedBy:req.userID});

        const postCreated = await post.save();

        if(postCreated){
            res.status(200).json({message:"POST CREATED SUCCESFULLY"})
        }

    }catch(err){
        console.log(err)
    }
    
 
})



postRouter.delete(`/deletepost/:postId`, authenticate , async (req, res)=>{

  try {
      
    const userPost = await Post.findOne({_id:req.params.postId}).populate("postedBy" , "_id");

    const deletePost = await userPost.remove();

    if(deletePost){
        
        const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt');

        res.json({allPosts})
    }


  } catch (error) {
      console.log(error)
  }

})



postRouter.put('/postcomment' , authenticate , async (req , res)=>{

    const { comment, postId} = req.body;

    
    if(!comment){
        console.log("Please Write a Comment")
        res.status(422).json({ error:"Please Write a Comment" })
    }
    
    try{
        
        const comments  = { text : comment , commentBy : req.userID }

        const post = await  Post.findByIdAndUpdate( postId , {
            $push:{comments}
        } , {
            new:true
        })

        const postComment =  await post.save();

        const allPosts = await Post.find().populate('postedBy comments.commentBy').sort('-createdAt');


        if(postComment){
            res.status(200).json({allPosts})
        }


    }catch(err){
        console.log(err)
    }

} )



module.exports = postRouter;