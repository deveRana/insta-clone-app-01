import React, { createContext , useReducer } from 'react'
import './style/App.css'
import {Route ,Switch } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx'
import Explore from './components/Explore.jsx'
import AddPost from './components/AddPost.jsx'
import Logout from './components/Logout.jsx'
import UserProfile from './components/UserProfile.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import {initialState ,reducer} from './reducer/useReducer.jsx';

// Link


// <!-- JavaScript Bundle with Popper -->

<> 

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>

 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</>





    export const UserContext = createContext();

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)


    const ShowMenu = ()=>{

      

        if(state === true){

             
            
            return (
                <>

                <Navbar/>

                <Switch>   

                        <Route exact path="/" > <Home/> </Route>
                        <Route exact path="/profile"  > <Profile/> </Route>
                        <Route exact path="/addpost"  > <AddPost/> </Route>
                        <Route exact path="/explore"  > <Explore/> </Route>
                        <Route exact path="/logout"  > <Logout/> </Route>
                        <Route exact path="/profile/:userId"  > <UserProfile/> </Route>

                </Switch>
                </>
            )

           


        }else{
            
            return (
                <>
              

                <Switch>

                    <Route exact path="/" >  <Login/> </Route>
                    <Route exact path="/register" > <Register/> </Route>

                </Switch>
                </>
            )

        }

    }

    

    return (
        <div className="appContainer">

         

            <UserContext.Provider value={{state , dispatch}}>

            
                <ShowMenu/>

 

            </UserContext.Provider>

        </div>
    )
}

export default App
