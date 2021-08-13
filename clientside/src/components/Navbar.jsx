import React,{useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css'
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CgAddR } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdExplore } from "react-icons/md";



const Navbar = () => {
 

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const setClassName = (sV)=>{

    if(sV.length>0){
      return "searchResultsOn"
    }else if(sV.length===0){
      return "searchResultsOff"
    }

  }


  const searchEvent = async ()=>{

    const res = await fetch('/searchuser' , {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        searchValue 
      })
    })

    const json = await res.json();
    setSearchResults(json.users)

  }


  useEffect(() => {
    
    if(searchValue){
      searchEvent();
    }

  }, [searchValue])

  return (

    <>

      <nav class="navbarDiv">


        <div className="leftNavbarDiv">
          <h2 >Instagram</h2>
        </div>

        <div className="centerNavbarDiv">
          <input type="search" placeHolder="Search" value={searchValue} onChange={ (e)=>{

          setSearchValue(e.target.value)         
          } } />
          
          <div className={ setClassName(searchValue)  } >

              {
                searchResults.map( (curProfile)=>{
                  
                  return (
                    <>                   
                      <div className="resultProfile" key={curProfile._id}  >
                       <NavLink to={ "/profile/"+curProfile._id }  onClick={setSearchValue("")} >
                        <h2>{curProfile.Fullname}</h2>
                        <h3>{curProfile.Username}</h3>
                       </NavLink>
                      </div>
                    </>
                  )

                } )
              }

                

          </div>

        </div>


        <div className="rightNavbarDiv">

          <ul>
            <li >
              <NavLink  to="/" >    <AiOutlineHome />  </NavLink>
            </li>
          </ul>
          <ul>
            <li >
              <NavLink  to="/profile" >   <CgProfile />  </NavLink>
            </li>
          </ul>
          <ul>
            <li >
              <NavLink  to="/addpost" >   <CgAddR />  </NavLink>
            </li>
          </ul>
          <ul>
            <li >
              <NavLink to="/explore">   <MdExplore />  </NavLink>
            </li>
          </ul>
          <ul>
            <li >
              <NavLink to="/logout">   <FiLogOut />  </NavLink>
            </li>
          </ul>

         

        </div>



      </nav>

    </>

  )
}

export default Navbar;
