const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Connection SuccesFull")
}).catch((err)=>{
    console.log("MongoConnection Error")
    console.log(err)
})