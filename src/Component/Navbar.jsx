import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const Navbar = () => {
     const navigate = useNavigate();
  
  const loggedInUserData = JSON.parse(localStorage.getItem ("logindata")) ||{}
  
  const [showModal , setShowModal]= useState (false);
  const userInitial= loggedInUserData?.role?.charAt(0).toUppercase();
  const showModalHandler =() => {
  setShowModal(true);
  }
  
  const hideModalHandler =() => {
    console.log("Modal Close")
    setShowModal(false);
  }

  const logoutHandler =() => {
    localStorage.removeItem("logindata");
    localStorage.removeItem("user");
    toast.success("Logout succesfull");
    setShowModal(false)
    setTimeout(()=>{
      navigate("/Signup")
    },2000);
  
  }

  return (
    <>
    <div className="navbar">
      <ToastContainer/>
      <h1 className="logo">Blog post</h1>
      <ul className="nav-links">
       
        <li><NavLink to="/"  className={({ isActive })=> (isActive ? "Active-link" : "")}>Home</NavLink></li>
        
          <NavLink to="/post"
           className={({ isActive })=> (isActive ?
             "Active-link" : "")}>
            New post</NavLink>
           
        <li><NavLink to="explorepost"  className={({ isActive })=> (isActive ? "Active-link" : "")}>Explore post</NavLink></li>
        <li><NavLink  onClick={showModalHandler}>Log out</NavLink></li>
      </ul>
     
      <button className="dark-mode">Dark</button>
      <button className="admin" >Admin</button>
      <p>{loggedInUserData.role}</p>
      {showModal && (
      <ConfirmationModal
       title="Logout"
       desc="You are about to log out,are you sure?"
       onClose={hideModalHandler}
       onConfirm={logoutHandler}
       confirmBtnText="Logout"
      /> 
      )}
    </div>
    </>
  );
};

export default Navbar;
