import { Navbar } from "./Navbar";
import './Registration.css'
  export function Registration() {
  
     return(
        <>
      
    <h1> Let's Create New Post</h1>
    <div className="form">  
    <div className="title">
    <input type="Enter Title" placeholder="Enter Title"/>
     </div>
     
    <textarea type="Enter Body" placeholder="Enter Body"/>
   
    <div className="box">
    <input type="file" placeholder="choose file"/>
    </div>
    <div className="">
    <input type="button" value="Add Post"/>
    </div>
    
   
    
    </div>
    </>
  );
 }
 export default Registration;