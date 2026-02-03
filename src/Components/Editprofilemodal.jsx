    import { useEffect, useState } from 'react';
    import './Editprofilemodal.css';
    import { useNavigate } from 'react-router-dom';
    import { toast } from 'react-toastify';
    
    const EditPostModal = ({onClose,userId}) => {
        
      const [EditPostModal, setEditPostModal] = useState({
        fullName: "",
        mobile: "",
        role: "",
        OTP : "",
      });

      const [error, setError] = useState({});
      const [loading, setLoading] = useState(false);
      const [saving,setSaving] = useState(false);

      // Fetch user when modal opens
      useEffect(() => {
        if (userId) {
          fetchUserById();
        }
      }, [userId]);

      
      const fetchUserById = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://6971fb5732c6bacb12c553fb.mockapi.io/users/${userId}`
          );
          const data = await response.json();
          setEditPostModal({
            fullName: data?.fullName || "",
            mobile: data?.mobile|| "",
            role: data?.role || "",
            OTP: data?.OTP || "",
          });
        } catch (error) {
          console.error("Fetch user error:", error);
        } finally {
          setLoading(false);
        }
      };
       // Handle input change
       const handleChange = (e) => {
        setEditPostModal({
          ...EditPostModal,
          [e.target.name]: e.target.value,
        });
      };

      const handleSave= async () =>{
        try{
          setSaving(true);
            const response = await fetch(
              `https://6971fb5732c6bacb12c553fb.mockapi.io/users/${userId}`
            ,{
              method: "PUT",
              headers: {
             "Content-Type": "application/json",
            },
              body: JSON.stringify(EditPostModal),
             } 
            );
            if(!response.ok){
              toast.error("updated failed");
            }
            const updatedUser = await response.json();
            toast.error("user Updated Successfully");
            console.log("UPDATED USERS:",updatedUser);
            setTimeout(() =>{
              localStorage.setItem("loginData",JSON.stringify(updatedUser));
            },2000);
            onClose();
            }catch(error){
              console.log("Update user error:",error);
            } finally {
              setSaving(false);
            }
      }
      
      // Handle submit
      const handleSubmit = (e) => {
        e.preventDefault();
        
        const newError = {};

        if (!EditPostModal.fullName.trim()) newError.fullName = "Full Name is required";
        if (!EditPostModal.mobile.trim()) newError.mobile = "Mobile No is required";
        if (!EditPostModal.role.trim()) newError.role = "Role is required";
        if (!EditPostModal.OTP.trim()) newError.OTP = "OTP is required";

        setError(newError);
        if (Object.keys(newError).length === 0) {
          handleSave();
        setLoading(false);
      };
    } 
   
      return (
        <div className="model-Edit">
          <div className="model">
            <h2>Edit Profile</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                className="input"
                value={EditPostModal.fullName}
                onChange={handleChange}
              /><br/>
              {error.fullName && <span className="error">{error.fullName}</span>}

              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile No."
                className="input"
                value={EditPostModal.mobile}
                onChange={handleChange}
              /><br/>
              {error.mobile && <span className="error">{error.mobile}</span>}

              <select
                name="role"
                className="select "
                disabled
                value={EditPostModal.role}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select><br/>
              {error.role && <span className="error">{error.role}</span>}

              <input
                type="text"
                name="OTP"
                placeholder="Enter OTP"
                disabled
                className="input"
                value={EditPostModal.OTP}
                onChange={handleChange}
              /><br/>
              {error.OTP && <span className="error">{error.OTP}</span>}

              <div className="model-action">
                <button type="button" className="bttn bttn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="bttn bttn-save" disabled={saving}>
                Save
                </button><br/>
              </div>

            </form>
          </div>
        </div>
      );
    };

    export default EditPostModal;
