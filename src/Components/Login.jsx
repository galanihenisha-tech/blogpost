import React, { useState } from "react";
import "./Login.css";
import login from "../assets/image/login1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [OTP, setOTP] = useState("");
  const [generateOTP,setGenerateOTP] = useState ("");

  const navigate = useNavigate();
  const random = Math.floor(1000 + Math.random() * 9000);

  const [mobilevalidation, setMobilevalidation] = useState("");
  const [rolevalidation, setRolevalidation] = useState("");
  const [OTPvalidation, setOTPvalidation] = useState("");
  const [loading,setLoading] = useState(false);
  
  const handleGenerateOTP = (e) => {
    e.preventDefault();
    setOTP(random.toString());
    setGenerateOTP(random.toString());
    alert("One Time Password: " + random);
    console.log("mobile:", mobile);
    console.log("role:", role);
  };


  const handlemobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleroleChange = (e) => {
    setRole(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const loginClick = async (e) => {
    e.preventDefault();

    if (!mobile) {
      setMobilevalidation("mobile is required");
    }
    if (!role) {
      setRolevalidation("role is required");
    }
    // if (!OTP) {
    //   setOTPvalidation("OTP is required");
    // }

    if (!mobile || !role || !OTP) {
      return;
    }
    if(generateOTP != OTP){
      toast.error("Invalid OTP")
      return;
    }

    setMobilevalidation("");
    setRolevalidation("");
    setOTPvalidation("");

    setMobile("");
    setRole("");
    setOTP("");
    const formData = { 
      mobile, 
      role, 
      OTP 
    };

   try {
    setLoading(true);
      const res = await fetch(
        "https://6971fb5732c6bacb12c553fb.mockapi.io/users"
      );
      const users = await res.json();
      // FIND EXISTING USER
      const existingUser = users?.find(
        (user) =>
          user.mobile == mobile &&
          user.role == role
      );
      if (existingUser) {
        const userExistingData = existingUser;
        toast.success("Login successfully");
        setTimeout(() => {
          localStorage.setItem("loginData", JSON.stringify(userExistingData));
          navigate("/");
        }, 2000);
      } else {
        const url = 'https://6971fb5732c6bacb12c553fb.mockapi.io/users';
        const method = "POST";
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(response, "res");
        if (!response.ok) {
          toast.error("Invalid Request");
        }
        const data = await response.json();
        console.log("Form submitted: ", data);
        toast.success("Login successfully");
        setTimeout(() => {
          localStorage.setItem("loginData", JSON.stringify(data));
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <ToastContainer />

      <div className="login-left">
        <img src={login} alt="login illustration" />
      </div>

      <div className="login-right">
        <h2>Hello Again,</h2>
        <p className="subtitle">Welcome back, let's get started!</p>

        <form>
          <input
            type="text"
            placeholder="Mobile number"
            className="input-field"
            maxLength={10}
            minLength={10}
            value={mobile}
            onChange={handlemobileChange}
          />
          {mobilevalidation && <p className="error">{mobilevalidation}</p>}

          <select className="input-field" onChange={handleroleChange} value={role}>
            <option value="">Select a Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {rolevalidation && <p className="error">{rolevalidation}</p>}

          <button type="button" className="btn primary"  onClick={handleGenerateOTP}>
            Generate OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            className="input-field"
            onChange={handleOTPChange}
            value={OTP}
          />
          {OTPvalidation && <p className="error">{OTPvalidation}</p>}

          <button type="button" className="btn secondary" onClick={loginClick}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
