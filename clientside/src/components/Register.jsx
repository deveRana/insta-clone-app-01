import React, { useState  } from "react";
import "../style/Register.css";
import { NavLink, useHistory } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";

const Register = () => {
  const [value, setValue] = useState({
    emailPhone: "",
    Fullname: "",
    Username: "",
    password: "", 
  });

  let name, inputValue;

  const inputChangeEvent = (e) => {
    name = e.target.name;
    inputValue = e.target.value;

    setValue({ ...value, [name]: inputValue });
  };

  const setButtonClass = (e, f, u, p) => {
    if (e.length > 5 && f.length > 5 && u.length > 3 && p.length > 8) {
      return "buttonClass";
    }
  };

  const History = useHistory();

  const callRegisterEvent = async ()=>{


    const { emailPhone,Fullname,Username,password } = value;

    const res = await fetch('/register',{

      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        emailPhone,Fullname,Username,password 
      })

    }); 

    const data = await res.json();

    if(res.status === 422 || !data ){
      window.alert("Invalid Registration")
   }
    else if(res.status === 403  ){
      window.alert("User Already Exists")
   }
    else if(res.status === 404  ){
      window.alert("Full Name Taken")
   }
   else{
    window.alert("Succesfull Registration")
    History.push('./');
    }


  };



  return (
    <div className="registerContainer">
      <div className="upperRegisterDiv">
        <div className="headingDiv">
          <h1>Instagram</h1>

          <p>Sign up to see photos and videos from your friends.</p>

          <button>
            
            <span>
              <AiFillFacebook />
            </span>
            Log in with Facebook
          </button>
        </div>

        <div className="orDiv">
          <hr /> <span>OR</span> <hr />
        </div>

        <div className="inputRegisterDiv">
          <input
            type="text"
            name="emailPhone"
            value={value.emailPhone}
            onChange={inputChangeEvent}
            placeHolder="Mobile Number or Email"
            autoCorrect="off"
            autoComplete="off"
          />

          <input
            type="text"
            name="Fullname"
            value={value.Fullname}
            onChange={inputChangeEvent}
            placeHolder="Full Name (more than 5 letters)"
            autoCorrect="off"
            autoComplete="off"
          />

          <input
            type="text"
            name="Username"
            value={value.Username}
            onChange={inputChangeEvent}
            placeHolder="Username"
            autoCorrect="off"
            autoComplete="off"
          />

          <input
            type="password"
            name="password"
            value={value.password}
            onChange={inputChangeEvent}
            placeHolder="Password"
            autoCorrect="off"
            autoComplete="off"
          />

          <button
            className={setButtonClass(
              value.emailPhone,
              value.Fullname,
              value.Username,
              value.password
            )}
            disabled={value.password.length <= 7}
            onClick={callRegisterEvent}
          >
            
            Sign Up
          </button>
        </div>

        <div className="termsDiv">
          <p>
            
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
      </div>

      <div className="lowerRegisterDiv">
        <p> Have an Account ? 
        <span>          
          <NavLink to="/">Log IN</NavLink>
        </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
