import React, { useState , useContext } from 'react';
import '../style/Login.css';
import {NavLink} from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';


import { UserContext } from "../App.jsx";

const Login = () => {


    const {state , dispatch} = useContext(UserContext)

    const [emailPhone, setEmail] = useState("")
    const [password, setpassword] = useState("")
    


    const setButtonClass = (e,p)=>{
        if(e.length>0 && p.length>7){
            return "bgClass"
        }
    }
    


    const callLoginEvent = async ()=>{

        const res = await fetch('/login' , {
            method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emailPhone,
            password
          }) 
        }) 

        const data = await res.json();
       

        if(res.status === 422 || !data ){
            window.alert("Invalid Login")
         }
          else if(res.status === 403  ){
            window.alert("User Does'nt Exists")
         }
         else{        
         localStorage.setItem("jwt" ,data.token)
          dispatch({type:'USER' , payload:true})
          window.alert("Succesfull Login")
        //   History.push('./');
          }
 

    };
    
   
  

    return (
        <div className="loginContainer" >
            
            <div className="upperDiv">

                <div className="heading">
                    <h1>Instagram</h1>
                </div>
 
                <div className="inputDiv"> 

                    <input type="text" value={emailPhone} onChange={ (e)=>{setEmail(e.target.value)} } placeHolder="Phone number, username or email"/>
                    <input type="password" value={password} onChange={ (e)=>{setpassword(e.target.value)} } placeHolder="Password" />

                    <NavLink  className={setButtonClass(emailPhone ,password)} to="">
                        <button disabled={ password.length <= 7 } onClick={callLoginEvent} > Log In </button>
                    </NavLink>
                 
                </div>

                <div className="orDiv">
                    <hr />   <span>OR</span> <hr />
                </div>

                <div className="forgotPasswordDiv">

                    <h6> 
                         <NavLink to="/facebooklogin" >
                              <span><AiFillFacebook/></span>
                             Log in With Facebook 
                         </NavLink>
                    </h6>

                    <p><NavLink to="/passwordreset" >Forgot Password ?</NavLink></p>

                </div>

            </div>


            <div className="lowerDiv">
                <p>Don't Have an Account ? </p> <span> <NavLink to="/register" >Sign Up</NavLink> </span>
            </div>

        </div>
    )
}

export default Login;
