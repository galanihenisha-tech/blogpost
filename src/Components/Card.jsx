
import './Card.css'
// import ConfirmationModal from './ConfirmationModal';
import { useContext } from 'react';
import Modecontext from '../Context/Modecontext';
const Card = (props) => {   
    const ctx = useContext(Modecontext);
    const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};

    return(
        <>
        
        <div className={`card-container ${ctx.mode === "dark" ? "card-dark" :"card-light"}`}>
            <div className="icon-center" onClick={props.onRedirect}>
                <img src={props.img ? props.img:`https://picsum.photos/id/${props.id}/200/300`} />
            </div>
            <div className="card-content">
                <h1>{props.title}</h1>
                <p>{props.desc.length > 80 ? props.desc.substring(0,100) + "..." : props.desc}</p>
            </div>

            
            { loggedInUserData?.role === "admin" ?  
            <div className="action-btn">
                <button className="edit-btn" onClick={props.onEdit}>Edit</button>
                <button className="delete-btn" onClick={props.onDelete}>Delete</button>
            </div>:<></>}
            
        </div>

        
        
        </>
    );
}
export default Card;