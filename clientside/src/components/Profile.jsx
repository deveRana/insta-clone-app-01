import React ,{useEffect , useState} from 'react'
import '../style/Profile.css'
import UserImage from '../images/Devil.jpg'
import { BsGrid3X3 } from 'react-icons/bs';
import { FcAddImage } from 'react-icons/fc';


const Profile = () => {

    const [post , setPost] = useState([]);
    const [userDetails , setUserDetails] = useState([]);
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [photoLength, setPhotoLength] = useState(0)
    
    const [imageName, setImageName] = useState("")
    const [url, setUrl] = useState("")


    const addUserImage = async ()=>{

        const data =  new FormData()

        data.append("file" , imageName )
        data.append("upload_preset" , "insta-clone")
        data.append("cloud_name" , "projectsbyrana")

            const response = await fetch('https://api.cloudinary.com/v1_1/projectsbyrana/image/upload', {
                method: 'POST',
                body:data
              });
              
            const json = await response.json();
            setUrl(json.url)
 
    }

    const saveUserImage = async()=>{
 
        const res = await fetch('/adduserpic' ,{
            method:"PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              url 
            })
          })

        const json = await res.json();

        setUserDetails(json)
        setFollowers(json.followers.length)
        setFollowing(json.following.length)
        setPhotoLength(json.photo.length)

    }

    const getUserDetails = async ()=>{

        const res = await fetch('/getData' ,{
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await res.json();

        setUserDetails(json)
        setFollowers(json.followers.length)
        setFollowing(json.following.length)
        setPhotoLength(json.photo.length)
    }

    


    const callProfilePage = async ()=>{

        const res = await fetch('/myprofile' , {
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            } 
        })

        const data = await res.json();

        setPost(data.userPost)
    }


    useEffect(() => {
       
        getUserDetails();
        callProfilePage();

    }, [])

    useEffect(() => {

        
       if(url){
        saveUserImage();
       }

    }, [url])

    useEffect(() => {


       if(imageName){
        addUserImage();
       }

    }, [imageName])
 
    return (
        <div className="profileContainer" >
          
            <div className="upperProfileContainer">

                <div className="leftProfileContainer">
                                               
                        {
                        photoLength > 0 
                        ? (
                            <img src={userDetails.photo.[photoLength-1]} alt="User" />
                        ) 
                        
                        
                        : (
                           <>
                            <input type="file" 
                                id="file"
                                onChange={ (e)=>{
                                    setImageName(e.target.files[0]) 
                                } } 
                            />
                            <label for="file" > <FcAddImage/> </label>
                           </>
                        )                   
                        }

                </div>

                <div className="rightProfileContainer">

                        <div className="fullNameDiv">
                                <h2>{userDetails.Fullname}</h2>
                        </div>

                        <div className="postFollowFollwersDiv">

                                <div className="postDiv">
                                    <span>
                                        {
                                           ( post.length)
                                        }
                                    </span>
                                         <p>
                                             {
                                                 post.length>=0 && post.length<2 ? ("post") : ("posts")
                                             }
                                         </p>
                                </div>

                                <div className="followersDiv">

                                    <span>
                                        {
                                           ( followers)
                                        }    
                                    </span> 
                                    <p>
                                        {
                                                 followers>=0 && followers<2 ? ("follower") : ("followers")
                                        }
                                    </p>

                                </div> 

                                <div className="followingDiv">

                                    <span>
                                        {
                                           ( following)
                                        }  
                                    </span>
                                    
                                    <p>following</p>
                                    
                                </div>

                        </div>

                        <div className="userNameDiv">
                                <h3>{userDetails.Username}</h3>
                        </div>

                </div>

            </div>

            <div className="lowerProfileContainer">

                    <div className="upLowerContainer">
                        <div className="postSection">
                           <BsGrid3X3/>  Posts
                        </div>
                    </div>

                    <div className="downLowerContainer">

                    {
                        post.map( (curEle)=>{
                            return (
                                <img key={curEle._id} src={curEle.photo} alt="User" />
                            )
                        } )
                    }

                   
                    </div>

            </div>

        </div>
    )
}

export default Profile;
