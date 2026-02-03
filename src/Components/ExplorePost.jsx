
import './Card.css'
// import ConfirmationModal from './ConfirmationModal';


const Card = (props) => {   

    const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};

    return(
        <>
        
        <div className="card-container">
            <div className="icon-center" onClick={props.onRedirect}>
                <img src={props.img}/>
            </div>
            <div className="card-content">
                <h1>{props.title}</h1>
                <p>{props.desc.length > 100 ? props.desc.substring(0,100) + "..." : props.desc}</p>
            </div>
            {loggedInUserData?.role === "admin" ? 
            <div className="action-btn">
                <button className="edit-btn" onClick={props.onEdit}>Edit</button>
                <button className="delete-btn" onClick={props.onDelete}>Delete</button>
            </div>:<></>}
        </div>

        
        
        </>
    );
}
export default Card;