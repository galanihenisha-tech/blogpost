import { useContext,useEffect, useState } from 'react';
import './Register.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import Snowfall from 'react-snowfall'
import Loader from '../Components/Loader';
import Modecontext from '../Context/Modecontext';

export function Register(){
    // const navigate = useNavigate();

    const [createPostFormData,setCreatePostFormData] = useState({
        title:"",
        body:"",
        image:"",
    });
        
        const [loading,setLoading] = useState(false);
        const [errors,setErrors] = useState({});
        const navigate = useNavigate();
        const location = useLocation();
        console.log(location,"Location value")
        const editPostId = location.state?.id || null;
        const ctx = useContext(Modecontext);
        console.log({editPostId});


        const handleChange = (field,value) => {
            console.log({field,value});
            //clear error msg when value is entered
            setErrors((e) => ({ ...e,[field]: ""}));
            //store form value in state
            setCreatePostFormData({...createPostFormData,[field]:value});
        }
        console.log("createPostFormData",createPostFormData);

        console.log("editPostId",editPostId);

        //automatically fill data in form(useEffect used to perform side effect)
        useEffect(() => {
            if(!editPostId) return;
            const posts = JSON.parse(localStorage.getItem("postData")) || [];
            const postToEdit = posts.find((p) => p.id === editPostId);
            console.log(postToEdit,"post data");
            if(postToEdit) {
                 setCreatePostFormData({
                    title:postToEdit.title,
                    body:postToEdit.body,
                    image:postToEdit.image,
                 });
            }
         },[editPostId]);

        const handleImageChange = (file) => {
            if(!file) return;
            console.log({file});

            //file upload validation
            const allowedTypes = ["image/jpeg","image/png","image/jpg"];
            if(!allowedTypes.includes(file.type)){
                setErrors((e) => ({
                    ...e,
                    image: "only JPG,JPEG,PNG images are allowed",
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setCreatePostFormData({...createPostFormData,image:reader.result});
                setErrors((e) => ({...e,image:""}));
            };
            reader.readAsDataURL(file);
        };
        console.log(createPostFormData.image);

        const handleSubmit = (e) => {
            e.preventDefault();
            const newErrors = {};

            if(!createPostFormData.title.trim()) newErrors.title = "Title is required";
            if(!createPostFormData.body.trim()) newErrors.body = "Body is Required";
            if(!createPostFormData.image.trim()) newErrors.image = "Image is Required";

            setErrors(newErrors);
            console.log("Object keys",Object.keys(newErrors));

            if(Object.keys(newErrors).length>0){
                return;
                
            } 
            //get existing post data from local storage
            setLoading(true);
            const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];
            //keep old data as it is and add new post at last(array format)

            if(editPostId) {
                console.log("createPostFormData",createPostFormData)
                const updatePosts = existingPosts.map((p) =>
                p.id === editPostId ? {...p, ...createPostFormData} : p);
            
            localStorage.setItem("postData",JSON.stringify(updatePosts));
            setLoading(false);
            navigate("/");
            return;
            }

            //keep old data as it is and add new post at last (array)
            const updatePosts = [...existingPosts,
                { id:uuidv4(),...createPostFormData}
            ];
             toast.success("post success")
            localStorage.setItem("postData",JSON.stringify(updatePosts));
            console.log("post submitted:",createPostFormData);

            setTimeout(()=>{
                navigate("/")
                setLoading(false);
            },2000);
            
        };



    return(
        <>
        {loading && <Loader />}
        <Snowfall color='black'/>
            <div className={`container ${ctx.mode === "dark" ? "container-dark" :"container-light"}`}>
                <ToastContainer/>
                <div className="register-container">
                <h1>{editPostId ? "Let's Update Post" : "Let's Create New Post"}</h1>

                <form className='form' onSubmit={handleSubmit}>

  <div className="form-row">
    <div className="form-left">
      <input type="text" 
        placeholder="Enter title"
        value={createPostFormData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      {errors.title && <span className='error'>{errors.title}</span>}
    </div>

    <div className="form-right">
      <textarea 
        placeholder="Enter Body"
        value={createPostFormData.body}
        onChange={(e) => handleChange("body", e.target.value)}
      />
      {errors.body && <span className='error'>{errors.body}</span>}
    </div>
  </div>

   <div>
  <input type="file" 
    className='img' 
    accept='image/jpeg,image/png,image/jpg'
    onChange={(e) => handleImageChange(e.target.files[0])}
  />
  {errors.image && <span className='error'>{errors.image}</span>}
  </div>
  {createPostFormData.image && (
    <img
      src={createPostFormData.image}
      alt="preview"
      style={{width:200,borderRadius:10}}
    />  
  )}

  <input type="submit" className="btn" value={editPostId ? "Update Post" : "Add Post"} /> 
</form>
 
                </div>
            </div>
            
        </>
    );
}
export default Register;