import React,{useContext ,useEffect}  from 'react'
import { UserContext } from "../App.jsx";
import {useHistory} from 'react-router-dom';


const Logout = () => {
    
    const {state , dispatch} = useContext(UserContext)

    const History = useHistory();

    const callLogoutPage = async ()=>{

        const res = await fetch('/logout',{
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const data = await res.json();
          
    if(res.status === 200){
            localStorage.clear();
            dispatch({type:'USER' , payload:false})
            History.push('/');
    }

    }

    useEffect(() => {
        
        callLogoutPage();

    }, [])

    return(
        <>
       
        </>
    )

}

export default Logout
