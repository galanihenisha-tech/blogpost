import { Navbar } from "../Components/Navbar"
import Card from '../Components/Card'
import Image1 from '../assets/image/cargo.jpg'
import Image2 from '../assets/image/jaguar.jpg'
import Image3 from '../assets/image/bellavita.jpg'
import Image4 from '../assets/image/exotica.jpg'
import Image5 from '../assets/image/fogg.jpg'
import Image6 from '../assets/image/ajmal_neea.jpg'
import { useContext, useEffect, useState } from "react"
import ConfirmationModal from "../Components/ConfirmationModal"
import { useNavigate } from "react-router-dom"
import Snowfall from 'react-snowfall'
import { FaArrowCircleUp } from "react-icons/fa";
import Modecontext from "../Context/Modecontext"

// const allPostData = [
//     {
//       title : "Cargo",
//       desc : "Its perfumes are generally long-lasting and provide fresh, appealing fragrances suitable for casual or office use.",
//       img : Image1
//     },
//     {
//       title : "Jaguar",
//       desc : "Trendy fragrance brand for men, offering bold and sophisticated scents.Long-lasting, fresh, and ideal for both casual and formal occasions.",
//       img : Image2
//     },
//     {
//       title : "Bellavita",
//       desc : "Elegant fragrance brand offering fresh and floral scents, mainly for women.Available in India through online stores and local retail outlets.",
//       img : Image3
//     },
//     {
//       title : "Exotica",
//       desc : "Popular fragrance brand offering vibrant and long-lasting scents, mainly for women.Fresh, floral, and fruity notes ideal for casual and daily wear.",
//       img : Image4
//     },
//     {
//       title : "Fogg",
//       desc : "Popular Indian fragrance brand offering strong and long-lasting scents for men and women.Fresh, musky, and attractive fragrances suitable for daily use or special occasions.",
//       img : Image5
//     },
//     {
//       title : "Ajmal_Neea",
//       desc : "Elegant fragrance from Ajmal Perfumes, mainly designed for women.Fresh, floral, and long-lasting scent suitable for casual and formal occasions.",
//       img : Image6
//     },
//   ]
  export function Homepage () {
  
    const [allPostData,setAllPostData] = useState([]);
    const [showModal,setshowModal] = useState(false);
    const [selectedIndex,setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    const ctx = useContext (Modecontext)
    useEffect(() => {
      const allPostData = JSON.parse(localStorage.getItem("postData")) || [];
      setAllPostData(allPostData);
    }, []);

     const scrollToSection = (id) =>{
      const element = document.getElementById(id);
      if (element){
        element.scrollIntoView({ behavior : 'smooth'});
      }
     };

    const openDeleteModal = (index) => {
      console.log(index,"index");
      setSelectedIndex(index);
      setshowModal(true);
    };

    const clickHandler = (id) => {
      navigate(`/posts/${id}`);
    };

    const confirmDelete = () => {
      const updatedPostData = allPostData.filter((_,i) => i !==selectedIndex);
      console.log(updatedPostData,"UpdateData")
      setAllPostData(updatedPostData);
      localStorage.setItem("postData",JSON.stringify(updatedPostData));
      setshowModal(false);
    };

    const handleEdit = (id) => {
      console.log({id});
      //pass data from one page to another page
      navigate("/new-post",{state: {id} });
    }

    return<>
    <div className={`container-home ${ctx.mode === "dark" ? "container-dark" :"container-light"}`}>
    <span id='top'></span>
    {/* <Navbar/> */}
    <Snowfall color="black"/>
    <h1 style={{color: "white",textAlign:"center" ,padding:"20px"}}></h1> 
        <div className={`container ${ctx.mode}`}>
           {allPostData.length === 0 ? ( 
            <p>no data found</p>
           ):(
             allPostData.map((item,index) => (
              <Card 
              key={index}
              title={item.title}
              desc={item.body}
              img={item.image}
              mode={ctx.mode}
              onDelete={() => openDeleteModal(index)}
              onRedirect={() => clickHandler(item.id)}
              onEdit={() => handleEdit(item.id)}
              />
             ))
            )}
          </div>
          </div>
          <FaArrowCircleUp className="top-button"  onClick={() =>{scrollToSection('top')}}/>
          
          {showModal && (
          <ConfirmationModal
            title = "Delete Post?"
            desc = "Are you sure you want to delete this post? This action cannot be undone."
            onConfirm = {confirmDelete}
            onClose = {()=> setshowModal(false)}
            confirmBtnText = "Delete"
            />
      )}
    </>
};

