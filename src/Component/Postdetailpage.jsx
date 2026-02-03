import { useEffect, useState} from "react";
import './Postdetailpage.css';
import {useNavigate, useParams } from "react-router-dom";

const Postdetailpage =(props) =>{

    const {postId} =useParams();
    const navigate= useNavigate();
    const [currentpost ,setCurrentpost] =useState({});
    const [showModal,setShowModal] =useState (false);
    const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData")) || {};
    const Postdata = JSON.parse(localStorage.getItem ("postData")) || [];
    const showModalHandler =() => {
    setShowModal(true);
    }

    const handleEdit =() =>{
      
      navigate("/Post",{state:{id:postId}});
    }
    
    useEffect(() =>{
      const filtered = Postdata.find(item => String(item.id) === String(postId));
      if (filtered) setCurrentpost(filtered);
      },[postId]);

     const hideModalHandler =() => {
      console.log("Modal Close")
      setShowModal(false);
    }
  
    return (
      <>
      <div className="postdetail">
        <div className="icon-center">
          <div className="post-card">
          <img className="img" src={currentpost.image} alt="image" />  
          
        <div className="post-content">
          <h1>{currentpost.title}</h1>
          <p>{currentpost.body}</p>
        </div>
        </div>
  
        <div className="nbtn">
          <button className="btn" onChange={hideModalHandler}>Edit</button>
          <button className="btn" onClick={currentpost.onDelete} onChange={showModalHandler}>Delete</button>
          <p>{loggedInUserData.role}</p>
      </div>
      </div>
      </div>
      </>
    )
};
export default Postdetailpage;