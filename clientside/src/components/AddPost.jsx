import React,{useState ,useEffect} from 'react'
import '../style/AddPost.css'



const AddPost = () => {

    const [title ,setTitle] = useState("");
    const [body ,setBody] = useState("");
    const [imageName ,setImageName] = useState("");
    const [url ,setUrl] = useState("");

    useEffect( () => {
 
        const callPost = async ()=>{
           
            const postRes = await fetch('/addpost' ,{
                method:"POST",
                headers:{
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  title,
                  body,
                  url
                })
              })
    
              const postData = await postRes.json();
    
              if(postData.status === 422){
                window.alert("Please Fill Every Input Filled")
             }
             else{         
              window.alert("POST CREATED SUCCESFULLY")
                setTitle("");
                setBody("");
                setImageName("");
              }
            
        }

        if(url){
            callPost();
        }

    }, [url])

    const postDetails =  async ()=>{
        
        try{
        const data =  new FormData()

        data.append("file" , imageName )
        data.append("upload_preset" , "insta-clone")
        data.append("cloud_name" , "projectsbyrana")

      
           
            const response = await fetch('	https://api.cloudinary.com/v1_1/projectsbyrana/image/upload', {
                method: 'POST',
                body:data
              });
              
              const json = await response.json();
              setUrl(json.url)
       
            
            

        }catch(err){
            console.log(err)
        }

    }

   

 

    return (
        <div className="AddPostContainer" >
            <div className="innerPostContainer">

                <div className="upperContainer">

                    <input type="text"  placeholder="Title of Post"  value={title} onChange={(e)=>{setTitle(e.target.value)}} autoCorrect="off" autocomplete="off"  />
                    <input type="text"  placeholder="Body of Post"   value={body} onChange={(e)=>{setBody(e.target.value)}} autoCorrect="off" autocomplete="off" />

                </div>

                <div className="lowerContainer">

                    <div className="uploadDiv">                              
                            <input class="form-control" type="file" id="formFile" onChange={ (e)=>{setImageName(e.target.files[0])} }/>
                    </div>

                    <button onClick={ ()=>{postDetails()} }>
                        Submit Post
                    </button>


                </div>

            </div>
        </div>
    )
}

export default AddPost;
