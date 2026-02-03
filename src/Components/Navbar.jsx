import { useContext, useState } from "react";
import "./Navbar.css"
import ConfirmationModal from "./ConfirmationModal";
import {  NavLink, useNavigate } from "react-router-dom";
import Editprofilemodal from "./Editprofilemodal";
import Modecontext from "../Context/Modecontext";
export function Navbar(Props)
{
    const navigate = useNavigate();
    
    // console.log(Props.title) 
    
    // console.log(loggedInUserData);
    const ctx = useContext(Modecontext);
    console.log(ctx,"Context");
    const loggedInUserData = JSON.parse(localStorage.getItem("loginData")|| "{}") ;
    const [showModal,setshowModal] = useState(false);
    const userInitial = loggedInUserData?.fullName?.charAt(0).toUpperCase();
    const [showEditModal,setShowEditModal] = useState(false);
      
    const showModalHandler = () => {
        setshowModal(true);
    };
    
    const hideModalHandler = () => {
        console.log("Modal Close");
        setshowModal(false);
    };
    const logoutHandler = () => {
        localStorage.removeItem("loginData");
        localStorage.removeItem("user");
        setshowModal(false);
        navigate("/login");
    };
   
    // const logoutHandler = () => {
    //     localStorage.removeItem("loginData");
    //     setshowModal(false);
    //     navigate("/");
    // };
    

    return( 
        <>
        {""}
    <nav className={`nav ${ctx.mode == "dark" ? "nav-dark" :"nav-light"}`}>  
        
       <h2>BlogPost</h2>
        <ul>
        <li>
            <NavLink to="/" className={({isActive}) => (isActive ?  "active-link" : "")}>
                Home
            </NavLink>
        </li>
    
        {loggedInUserData?.role === "admin" ? //login in user
        <li>
            <NavLink to="/new-post" className={({isActive}) => (isActive ? "active-link" : "")}>New Post</NavLink>
        </li>:<></>}
        <li>
            <NavLink to="/explorepost" className={({isActive}) => (isActive ? "active-link" : "")}>ExplorePost</NavLink>
            </li><></>
        <button className="btn-clk" onClick={showModalHandler}>Logout</button>
       </ul>
       <span className="dark" onClick={ctx.toggleMode}>{ctx.mode == "dark"? "Light" :"Dark"}</span>
       
      
       {/* {loggedInUserData.role && <p>{loggedInUserData.role}</p>} */} 
       <span className="a" onClick={() =>setShowEditModal(true)}>{userInitial}</span>
    </nav> 

     {showEditModal &&
        <Editprofilemodal
        onClose={() => setShowEditModal(false)}
        userId={loggedInUserData?.id}
        />
      }

    
      {showModal && (
        <ConfirmationModal
            title = "Logout?"
            desc = "You are about to logout, are you sure?"
            onClose = {hideModalHandler}
            onConfirm = {logoutHandler}
            confirmBtnText = "Logout"
            />

      )}
      </> 
    );
};

