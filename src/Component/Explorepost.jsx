import { useEffect, useState } from "react"
import Card from "../Component/Card"
import './explorepost.css'
import {Pagenation} from "./Pagenation";
import { toast } from "react-toastify";

   const  explorepost =() =>{
      
      const [explorepost, setexplorepost] = useState({
        title: "",
        body: "",
        image: "", 
      });

      const [errors,setErrors]= useState({
        title: "",
        body: "",
      });

    const [postId,setpostId]=useState();
    const [postData,setpostData] = useState([]);
    const [filterpost,setfilterpost] = useState([]);
    const [loading,setLoading] =useState(false);
    const [showModal , setShowModal]= useState (false);
    const [search,setSearch] = useState("");
    const [showform,setShowform]=useState(false);
    const [currentPage,setCurrentPage] =useState(1);
    const [PostsPerPage,setPostsPerPage] =useState(10);
   
    const handleSearch = (e) =>{
        const value = e.target.value;
        setSearch(value);
        setCurrentPage(1);

        const result = postData.filter(
            (item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.body.toLowerCase().includes(value.toLowerCase()) 
            );
            setfilterpost(result);
     }

     const handleChange = (field, value) => {
        setErrors((e) => ({ ...e, [field]: "" }));
        setexplorepost({ ...explorepost, [field]: value });
      };
      const handleCancel = () => {
        setexplorepost({
          title: "",
          body: "",
          image:"",
        });
        setErrors({});
        setShowform(false);
      };
      const openDeleteModal =(Index) =>{
        setpostId(Index);
        setShowModal(true);
      }

const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost"
      );
      
      if (!response.ok) {
        toast.error("Something went wrong!");
        return;
      }

      const data = await response.json();
      const reversedData = [...data].reverse();
    setpostData(reversedData);
    setfilterpost(reversedData);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchData();
   },[]);

      const deleteDataGetById = async (id) => { 
        try{
          setLoading(true);
          setpostId(id);
          const response =await fetch(
            `https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${postId}`,
            {
               method:"DELETE",
            }
          );
          if (!response.ok){
            toast.success("Post deleted successfully");
          fetchData();
          }
          await response.json();
          alert("Post deleted successfully");
          setpostId(null);
          getCreatepostformData();
        }catch(error){
          toast.error("DELETE API Error:",error.message);
        }finally{
          setLoading(false);
        }
      }
        const postDataGetById = async (id) => {
          try {
            setLoading(true);
            const response = await fetch(
              `https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${id}`
            );
          const data =await response.json();
          setpostId(id);
          setexplorepost({
            title:data.title || "",
            body:data.body || "",
            image:data.image || "",
          });
          setShowform(true);
      } catch(error){
        toast.error("GET BY ID API Error",error.message);
        }finally{
          setLoading(false);
        };
      };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
         console.log("SUBMITTED DATA:", explorepost);
          const newErrors = {};
          if (!explorepost.title.trim()) newErrors.title = "Title is required";
          if (!explorepost.body.trim()) newErrors.body = "Body is required";
        
          setErrors(newErrors);
          if (Object.keys(newErrors).length > 0) return;
        
          try {
            setLoading(false);
        
            const response = await fetch(
             postId ?`https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${postId}`: "https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost",
              {
                method: postId ? "PUT":"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: explorepost.title,
                  body: explorepost.body,
                  image:postId ? explorepost.image: `https://picsum.photos/200/300?random=${Date.now()}`,
                }),
              }
            );
        
            const data = await response.json();
            setpostData((prev) => [data, ...prev]);
            setfilterpost((prev) => [data, ...prev]);
            
            setexplorepost({ title: "", body: "" });
            setErrors({});
          } catch (error) {
            console.log("Error:", error);
          } finally {
            setLoading(false);
          }
        };
  
        const startIndex = (currentPage -1) * PostsPerPage;
        const totalPages = Math.ceil(filterpost.length/PostsPerPage);
    return(
        <>
        <div className="Explore">
        <h1>Explore post</h1>
        <input type="text" placeholder="search" value={search} onChange={handleSearch}/>
        </div>
      
        <div>
        <button type="button"  onClick={() =>setShowform(true)}
        className="post">create form</button><br/>
        </div>
        {showform &&(
        <div>
        <form onSubmit={handleSubmit}>
           
            <input type="text" 
            placeholder="Enter Title" 
            className="text-input"
            value={explorepost.title}
            onChange={(e) =>  handleChange("title", e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}

            <textarea
            placeholder="Enter Body" 
            className="text-input"
            value={explorepost.body}
            onChange={(e) => handleChange("body", e.target.value)}
            /><br/>
            {errors.body && <p className="error">{errors.body}</p>}

            <button type="submit" className="submit">Submit
            </button> <button type="button" 
            className="cancel" 
            onClick={handleCancel}>Cancel</button>
        </form>
        </div>
)}

       <div className="container">
        {loading ? (
         <h1 style={{ textAlign: "center"}}>loading...</h1>
        ):(
            filterpost.slice(startIndex, startIndex + PostsPerPage)
            .map((item,index) => (
                <Card key={index} data={item}
                title={item.title}
                desc={item.body}
                id={item.id}
                from="explore"
                onDelete={() =>deleteDataGetById(item.id)}
                onEdit={()=>postDataGetById(item.id)}
                />
            )
          )
        )} 
        </div>
      
        <Pagenation
         currentPage ={currentPage}
         totalPages ={totalPages}
         onPrev ={() => setCurrentPage((p) => p -1)}
         onNext ={() => setCurrentPage((p) => p +1)}
         PostsPerPage={PostsPerPage}
         setPostsPerPage ={setPostsPerPage}
         />

      {showModal && (
       <ConfirmationModal
       title="Delete post?"
       desc="Are You sure you want to delete this post?"
       onConfirm={deletePostById}
       onDelete = {() =>openDeleteModal(index)}  
       onclose={() =>{setShowModal(false); setpostId(null) }}
       confirmBtnText="delete"
       />
      )}
        </> 
    )
  }
export default explorepost;