const express = require('express');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser')


const app = express();

// Getting Config File
dotenv.config({ path :'./config.env' })

app.use(express.json());

app.use(cookieParser());

// Routing
app.use(require('./router/router.js'))

// Linking Posting Routes
app.use(require('./router/postRouter.js'))

// Linking User Routes
app.use(require('./router/userRouter.js'))

const Port = process.env.PORT;


if(process.env.NODE_ENV == "production"){
    
    app.use(express.static('clientside/build'));

}


app.listen(Port,()=>{
    console.log(`Server is Listening at Port : ${Port}`)    
})

  