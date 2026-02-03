import './App.css';
// import Navbar from './Components/Navbar';
// import Card from './Components/Card';
// import Image1 from './assets/image/butterfly3.jpg';
// import Image2 from './assets/image/parrot.jpg';
// import Image3 from './assets/image/peacock.jpg';
// import Image4 from './assets/image/sparrow.jpg';
// import Image5 from './assets/image/duck.jpg';
// import Image6 from './assets/image/kingfisher.jpg';

import { RouterProvider } from 'react-router-dom';
import { router } from './Components/Router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Login() {
//   const [Mobileno, setMobileno] = useState('');
//   const [role, setRole] = useState('');
//   const [otp, setOTP] = useState('');
//   const [generateOTP, setGenerateOTP] = useState('');

//   const navigate = useNavigate();

//   const handleGenerateOtp = (e) => {
//     e.preventDefault();

//     if (!Mobileno) return toast.error('Mobile No. is required');
//     if (!role) return toast.error('Role is required');

//     const random = Math.floor(1000 + Math.random() * 9000);
//     setGenerateOTP(random.toString());
//     alert('Your OTP is: ' + random);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!otp) return toast.error('Please enter OTP');
//     if (otp !== generateOTP) return toast.error('Invalid OTP');

//     // Save fresh login data in localStorage
//     const userData = { Mobileno, role };
//     localStorage.setItem('logindata', JSON.stringify(userData));
//     toast.success('Login successful!');

//     // Clear fields and OTP states
//     setMobileno('');
//     setRole('');
//     setOTP('');
//     setGenerateOTP('');

//     // Redirect to home or dashboard
//     navigate('/');
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <input
//         placeholder="Mobile Number"
//         value={Mobileno}
//         onChange={(e) => setMobileno(e.target.value)}
//         maxLength={10}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="">Select Role</option>
//         <option value="admin">Admin</option>
//         <option value="user">User</option>
//       </select>
//       <button onClick={handleGenerateOtp}>Generate OTP</button>
//       <input
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOTP(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <ToastContainer />
//     </div>
//   );
// }
