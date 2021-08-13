
const mongoose = require('mongoose');
const  bcrypt  = require('bcryptjs');
const jwt      = require('jsonwebtoken')


const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({


    emailPhone:{
        type:String,
        required:true
    },

    Fullname:{
        type:String,
        required:true
    },

    Username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    
    Date:{
        type:String,
        default:Date.now()
    },
    
    followers:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],

    following:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],

    photo:[
        {
            type:String,
            ref:"User"
        }
    ],
    
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

// Hasing Password
userSchema.pre('save' , async function(next){

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }

    next();

})

// Generating Token
userSchema.methods.generateToken = async function(){
    try{

        let token = await jwt.sign({_id:this._id} , process.env.SECRET_KEY )

        this.tokens = this.tokens.concat({token});

        await this.save();

        return token;

    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('User', userSchema);


module.exports = User;

