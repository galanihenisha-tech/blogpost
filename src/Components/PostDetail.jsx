import './PostDetail.css';
import Image from '../assets/image/butterfly.jpg';
import { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


export const PostDetail = () => {

  const navigate = useNavigate();
  // const [allPostData,setAllPostData] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

        const location = useLocation();
        console.log(location,"Location value")
        const editPostId = location.state?.id || null;

        console.log({editPostId});


  const { postId } = useParams();//used to get dynamic value for url
  const [currentPost, setCurrentPost] = useState({}); //used to store single post data
  const allPostData = JSON.parse(localStorage.getItem("postData")) || [];

  useEffect(() => {
    //find() method - apply only on array , return single object
    const filtered = allPostData.find(item => String(item.id) === String(postId));

    console.log({ allPostData, postId, filtered });

    if (filtered) setCurrentPost(filtered);
  }, []);

  const handleEdit = (id) => {
    console.log({id});
    //pass data from one page to another page
    navigate("/new-post",{state: {id} });
  }


  const openDeleteModal = (index) => {
    console.log(index, "index");
    setSelectedIndex(index);
    setshowModal(true);
  };

  const confirmDelete = () => {
    const updatedPostData = allPostData.filter((_, i) => i !== selectedIndex);
    console.log(updatedPostData, "UpdateData")
    localStorage.setItem("postData", JSON.stringify(updatedPostData));
    setshowModal(false);
  };
  
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};

  return (
    <>
      <div className="post-container">
        <div className="post-left">
          <img src={currentPost.image} alt="Post-illustration" />
        </div>
        <div className="post-right">
        <h1>{currentPost.title}</h1>
        <p>{currentPost.body}</p>
        </div>

        {loggedInUserData?.role === "admin" ? 
        <div className='btn-group'>
        {/* <button className='edt-btn' onClick={handleEdit}>Edit</button> */}
        <button className='edt-btn' onClick={() => handleEdit(currentPost.id)}>Edit</button>
        <button className='dlt-btn' onClick={openDeleteModal}>Delete</button>
        </div>:<></>}
      </div>

      {showModal && (
        <ConfirmationModal
          title="Delete Post?"
          desc="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={confirmDelete}
          onClose={() => setshowModal(false)}
          confirmBtnText="Delete"
        />

      )}


    </>
  );
}