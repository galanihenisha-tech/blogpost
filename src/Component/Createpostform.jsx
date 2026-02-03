import React, { useEffect, useState } from "react";
import './Createpostform.css'; 
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
const Cardform = () => {
  
  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: "", 
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location,"Location Value")
  const editpostid = location.state?.id || null;

  console.log({editpostid});

  const handleChange = (field, value) => {
    console.log({field, value});
    // clear error msg when value is entered
    setErrors((e) => ({ ...e, [field]: "" }));
    // store form value in state
    setCreatePostFormData({ ...createPostFormData, [field]: value });
  };
  
   
   console.log("createPostFormData",createPostFormData);
  
   useEffect(() =>{
    if (!editpostid)return;
    const Posts =JSON.parse(localStorage.getItem("postData"))||[];
    const Posttoedit=Posts.find ((p) => p.id === editpostid);
    console.log (Posttoedit,"post data")

    if(Posttoedit){
      setCreatePostFormData({
        title:Posttoedit.title,
        body:Posttoedit.body,
        image:Posttoedit.image,
      })
    }
   },[editpostid]);

   const handleCancel =() =>{
    navigate("/");
   }
  const handleImageChange = (file) => {
    if (!file) return;
    console.log({file});


    // file upload validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((e) => ({
        ...e,
        image: "only jpg, jpeg, png are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData({ ...createPostFormData, image: reader.result });
      setErrors((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };
   console.log(createPostFormData.image);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!createPostFormData.title.trim()) newErrors.title = "Title is required";
    if (!createPostFormData.body.trim()) newErrors.body = "Body is required";
    if (!createPostFormData.image.trim()) newErrors.image = "Image is required";
    setErrors(newErrors);
    console.log("object keys",Object.keys(newErrors));

    if (Object.keys(newErrors).length > 0) return;
    // get existing post data from local storage
    const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

    //edit mode + update existing record
    if (editpostid){
      console.log("createPostformdata",createPostFormData)
      const updatedPosts = existingPosts.map((p) =>
        p.id === editpostid ? {...p,...createPostFormData} : p
      );

    localStorage.setItem("postData",JSON.stringify(updatedPosts));
    navigate("/");
    return;
    }

    // keep old data as it is and add new post at last (array format)
    const updatedPosts = [...existingPosts,
    { id:uuidv4(), ...createPostFormData}
    ];
    localStorage.setItem("postData", JSON.stringify(updatedPosts));
    setCreatePostFormData({ title:"",body:"",image:""})
    console.log("Post Submitted:", createPostFormData);
    navigate("/");
  };

  return (
    <>
      <h1>Let's Create A New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">

          <input
            type="text"
            placeholder="enter title"
            className="text-input"
            value={createPostFormData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}

          <textarea
            placeholder="enter body"
            className="con"
            value={createPostFormData.body}
            onChange={(e) => handleChange("body", e.target.value)}
          />
          {errors.body && <span className="error">{errors.body}</span>}

          
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/jpg"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="file"
            />
             {errors.image && <span className="error">{errors.image}</span>}


             {createPostFormData.image && (
          <img
            src={createPostFormData.image}
            alt="preview"
            style={{ width: 200, borderRadius: 10 }}
            className="preview-img" 
          />
        )}
         <div>
           {editpostid && <button className="btn1" onChange={handleCancel}>cancel</button>}
          <button className="btn2">{editpostid ?  "Upadte post" : "Add post"}</button> 
          </div>
        </div>
      </form>
    </>
  );
};

export default Cardform;