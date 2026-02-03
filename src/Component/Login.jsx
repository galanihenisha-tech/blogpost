import { useState } from 'react';
import './Login.css'
import loginimg from '../assets/login.png'
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export const Loginform = () => {

  const [Mobile,setMobile] =useState("");
  const [Role,setRole] =useState("");
  const [OTP,setOTP] =useState("");
  const [GenerateOTP,setGenerateOTP] =useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [MobileValidation,setMobileValidation] =useState("");
  const [RoleValidation,setRoleValidation] =useState("");
  const [OTPValidation,setOTPValidation] =useState("");

  const handleGenerateOTP = () =>{
    if(!Mobile || !Role){
      toast.error("Enter Mobile and Role first");
      return;
    }
    const random = Math.floor(1000 + Math.random() * 9000);
    setGenerateOTP(random.toString());
    setOTP(random.toString());
    alert("One Time Password: " + random);
  }

  const handlesubmit= async (event) => {
    event.preventDefault();

    setMobileValidation("");
    setRoleValidation("");
    setOTPValidation("");
    
    if(!Mobile){
      setMobileValidation("Mobile is required");
      return;
    }
    if(!Role){
      setRoleValidation("Role is required");
      return;
    }
    if(!OTP){
      setOTPValidation("OTP is required");
      return;
    }
    if(GenerateOTP !== OTP){
      toast.error("Invalid OTP");
      return;
    }

    const formData = { Mobile,Role,OTP};
    try{
      setLoading(true);
      const url ='https://6971fb5732c6bacb12c553fb.mockapi.io/user';
      const method ="POST"
      const response = await fetch(
        url ,{
        method,
        headers:{
          "Content-Type": "application/json",
        },
        body :Json.stringify(formData),
      });
      console.log(response,"res");
      if (!response.ok) {
        toast.error("Invalid request");
        setLoading(false);
      }
      const data =await response.json();
      console.log("Form submitted:",data);
      
      toast.success("Login Successful!");
      setTimeout(() =>{
        localStorage.setItem("loginData",JSON.stringify(data));
        navigate("/");
      },2000);
    }catch (error){
      toast.error("Error");
    }
  };
  return(
    <div className="login-container">
      <div className="login-left">
        <img src={loginimg} alt="Login" />
        <ToastContainer/>
      </div>

      <div className="login-right">
        <h2>Hello Again,</h2>
        <p className="subtitle">Welcome Back, Let's Get Started!</p>

        <form onSubmit={handlesubmit}>
          <input type="text" placeholder="Mobile Number"
            className="input-field" maxLength={10}
            onChange={(e)=>setMobile(e.target.value)} value={Mobile} />

          {MobileValidation && <span className="error">{MobileValidation}</span>}

          <select className="input-field" onChange={(e)=>setRole(e.target.value)} value={Role}>
            <option value="">Select a Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {RoleValidation && <span className="error">{RoleValidation}</span>}

          <button className="button primary" type="button" onClick={handleGenerateOTP}>
            Generate OTP
          </button>

          <input type="text" placeholder="Enter OTP"
            className="input-field" onChange={(e)=>setOTP(e.target.value)} value={OTP} />

          {OTPValidation && <span className="error">{OTPValidation}</span>}

          <button className="button secondary" type="submit">Login</button>
          
        </form>
      </div>
    </div>
  )
}

export default Loginform;
