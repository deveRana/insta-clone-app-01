import React,{useEffect ,useState} from 'react'
import '../style/Home.css'
import NatureImg from '../images/Nature.jpg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {NavLink} from 'react-router-dom';

const Home = () => {

    const [data, setData] = useState([])


    const [comment, setComment] = useState("");
    const [userId, setUserId] = useState();
    

    const setButtonClass = (length)=>{
        if(length > 0){
            return "bg-color-Class"
        }
    } 
    
    const likePost = async (postId)=>{ 
                    
            const res = await fetch('/like',{

                method: "PUT",
                headers : { 
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    postId
                })

            })

            const json = await res.json();     
            setData(json.allPosts);
             
    }

    const UnlikePost = async (postId)=>{ 
                    
            const res = await fetch('/unlike',{

                method: "PUT",
                headers : { 
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    postId
                })

            })
 
            const json = await res.json();     
            setData(json.allPosts);
             
    }

    
    const deletePost  = async (postId)=>{

        
        const res = await fetch(`/deletepost/${postId}`,{
            method:"delete"
        })

        const json = await res.json();

        setData(json.allPosts);

    };

    
    const postComment = async (postId)=>{


        const res = await fetch('/postcomment' , {
            method:"PUT",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment,
                postId
            }) 
        })

        const json = await res.json();
        setData(json.allPosts); 
    }


    const callHomePage = async()=>{
     

        const res = await fetch('/allpostsbyfollowing' ,{
                method: "GET",
                headers : { 
                    "Content-Type" : "application/json"
                }
        })

        const json = await res.json();

        setData(json.allPosts);


    }

    const callGetUser = async ()=>{


        const res = await fetch('/getUser',{
            method: "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })

        const json = await res.json();

        setUserId(json.userId)

    }


    useEffect(() => {
        callHomePage();
        callGetUser();
    }, [])


    return (
        <div className="homeContainer" >

            <div className="innerContainer">

              
        {

            data.map( (curEle)=>{


                return (
                      <div className="cardContainer" key={curEle._id} >

                    <div className="cardProfileDiv">

                    
                       <div className="profileNameDiv">
                            <h2 > <NavLink to={ "/profile/"+curEle.postedBy._id } >  {curEle.postedBy.Fullname}  </NavLink> </h2>

                            {
                                curEle.postedBy._id === userId ? (<span onClick={ ()=>{ deletePost(curEle._id) } } >  Delete </span>) : ""
                            }

                        </div>

                       <div className="profilePicNameDiv">
                            <h2> {curEle.title} </h2>
                        </div>

                    </div>
  
                    <div className="cardImageDiv">
                        <img src={curEle.photo} alt="UI" />
                    </div>

                        <div className="cardLikeDiv"> 

                        
                        {
                         
                         curEle.likes.includes(userId) 
                         
                        ? 
                         <button
                        type="button"
                        className="redHeart"
                        onClick={ () => {

                                 UnlikePost(curEle._id)             
                        }}
                        > 
                           <AiFillHeart/>
                        </button>                        
                        
                        :
                        <button
                        type="button"
                        className="Not-a-redHeart"
                        onClick={ () => {

                               likePost(curEle._id)            
                        }}
                        > 
                            <AiOutlineHeart/>                      
                        </button>

                        }

                        <span>
                            {curEle.likes.length}
                        </span>
                        
                        <p>
                            {
                                curEle.likes.length > 1 ? "likes" : "like"
                            }
                        </p>
                        
                        
   
                    </div>           


                    <div className="cardBodyDiv">
                        <p> 
                        {curEle.body}
                        </p>
                    </div>

                    <div className="cardAllCommentsDiv">

                      {

                        curEle.comments.length>0 && curEle.comments.map( (curComment)=>{
                            return (
                                <div className="allComments">
                                <h3>{ curComment.commentBy.Fullname}:- </h3>
                                 <p>{ curComment.text }</p>
                                </div>
                            )
                        } )

                      }

                    </div>

                    <div className="cardCommentDiv">
                        <div className="commentIconDiv">
                            <BiComment />
                        </div>

                        <div className="commentInputDiv">
                            <input type="text" placeHolder="Add a comment..." 
                            onChange={ (e)=>{setComment(e.target.value)} } />
                        </div>

                        <div className="postIconDiv">
                            <button 
                                    className={setButtonClass(comment.length)}  
                                    disabled={ comment.length <= 0 } 
                                    onClick={ ()=>{ postComment(curEle._id) } }  
                                    > 
                                    
                                        POST
                            </button>                         
                        </div>

                    </div>

                </div>

                )

            } )
        }


            </div>


        </div>
    )
}

export default Home;
