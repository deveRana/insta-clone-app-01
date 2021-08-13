

const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },

    body:{
        type:String,
        require:true
    },
    
    photo:{
        type:String,
        require:true
    },

    comments:[
        {
            text:String,
            commentBy:{
                type:ObjectId,
                ref:"User"
            }
        }
    ],

    likes:[
        {
            type:ObjectId,
            ref:"User"
        },
    ],

    postedBy:{
        type:ObjectId,
        ref:"User"
    }


} , {timestamps:true} );

const Post = mongoose.model('Post' ,postSchema);

module.exports = Post;