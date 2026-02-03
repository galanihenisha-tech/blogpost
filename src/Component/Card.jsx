import { useState } from "react";
import "./Card.css";


const Card = (props) => {
  const loggedInUserData = JSON.parse(localStorage.getItem ("logindata")) ||{};
  
  return (
    <>
    <div className="card">
      <div className="icon-center" onClick={props.onRedirect} >
        
        <img className="img" src={props.image ? props.image :`https://picsum.photos/id/${props.id}/200/300`} alt="img" />  
        
      <div className="card-content">
        <h1>{props.title}</h1>
        <p>{props.desc?.length > 100 ? props.desc.substring(0,100) + "..." :props.desc}</p>
      </div>
      <div className="btn-container">
        <button className="btn edit" onClick={props.onEdit}>
          Edit</button>
          <button className="btn delete" onClick={props.onDelete}>Delete</button>
          </div>

      <div className="nbtn">
      {loggedInUserData?.role === "Admin" ? <li>
        <button className="btn" onClick={props.onEdit}>Edit</button>
        <button className="btn" onClick={props.onDelete}>Delete</button>
        </li>:<></>}
        <p>{loggedInUserData.role}</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Card;
