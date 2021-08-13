import React ,{useEffect , useState} from 'react'
import '../style/UserProfile.css'
import UserImage from '../images/userImg.jpg'
import { BsGrid3X3 } from 'react-icons/bs';
import {useParams} from 'react-router-dom';

const UserProfile = () => {

    const [post , setPost] = useState([]);
    const [userDetails , setUserDetails] = useState([]);
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [photoLength, setPhotoLength] = useState(0)
    const [followeState, setFolloweState] = useState(false)
    const [loginUser, setLoginUser] = useState({})



    const {userId} = useParams();


    const followUser = async ()=>{
 
        const res = await fetch('/follow',{
            method:"PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId
            }) 
        })

        const json = await res.json();

        setUserDetails(json.user)
        setFollowers(json.user.followers.length) 
        setFollowing(json.user.following.length) 
        setFolloweState(!followeState)
    }

    const UnfollowUser = async ()=>{
 
        const res = await fetch('/unfollow',{
            method:"PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId
            }) 
        })

        const json = await res.json();

        setUserDetails(json.user)
        setFollowers(json.user.followers.length)
        setFollowing(json.user.following.length)
        setFolloweState(!followeState)
    }


    const getUserDetails = async ()=>{


        const res = await fetch(`/user/${userId}` ,{
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await res.json();

        setUserDetails(json.findUser)
        setPost(json.UserPosts)
        setFollowers(json.findUser.followers.length)
        setFollowing(json.findUser.following.length)
        setPhotoLength(json.findUser.photo.length)
    }

    const checkFollowOrNot = async ()=>{

        const res = await fetch(`/checkfollow` ,{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userId
            }) 

        }) 

        const json = await res.json();

        setFolloweState(json)
    }
    
    const checkLoginUser = async ()=>{
        const res = await fetch(`/getData` ,{
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await res.json();
        setLoginUser(json)
    }


    useEffect(() => {
       
        getUserDetails();
        checkFollowOrNot();
        checkLoginUser();

    }, [])

    return (
        <div className="profileContainer" >
          
            <div className="upperProfileContainer">

                <div className="leftProfileContainer">
                        
                        {
                            photoLength>0 ? ( <img src={userDetails.photo.[photoLength-1]} alt="User" />) : (<img src={UserImage} alt="User" />)
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
                                            {followers}
                              </span>
                                    
                                    
                                    <p>
                                    {
                                                 followers>=0 && followers<2 ? ("follower") : ("followers")
                                    }
                                    </p>

                                </div> 

                                <div className="followingDiv">
                                    <span>{following}</span> <p>following</p>
                                </div>

                        </div> 

                        <div className="userNameDiv">
                                <h3>{userDetails.Username}</h3>

                                {
                                    loginUser._id === userDetails._id ? ""

                                    :
                                    followeState ? (
                                        <button onClick={ ()=>{followUser()} } className="followBtn">
                                             Follow
                                        </button> 
                                    ) : (
                                        <button onClick={ ()=>{UnfollowUser()} } className="followBtn">
                                            Unfollow
                                        </button>
                                    )
                                }

                               

                             

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

export default UserProfile;
