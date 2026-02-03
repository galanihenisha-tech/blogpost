import { IoSearchOutline } from "react-icons/io5";
import "./ExplorePosts.css";
import { useContext,useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import ConfirmationModal from "./ConfirmationModal";
import Modecontext from "../Context/Modecontext";

export const ExplorePosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const [showModal,setShowModal] = useState(false);
  const ctx = useContext(Modecontext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- FETCH ---------------- */
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost"
      );
      const data = await response.json();
      const reverseData = [...data].reverse();
      setPosts(reverseData);
      setFilteredPosts(reverseData);
    } catch (error) {
      console.error("get API error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const result = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(result);
  };

  /* ---------------- FORM ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim())
      newErrors.title = "Title is required";
    if (!formData.body.trim())
      newErrors.body = "Body is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CREATE / UPDATE 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const url = postId
        ? `https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${postId}`
        : "https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost";

      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          image: `https://picsum.photos/seed/${Date.now()}/200/300`,
        }),
      });

      const data = await response.json();

      if (postId) {
        setFilteredPosts(
          filteredPosts.map((p) => (p.id === postId ? data : p))
        );
        alert("Post Updated Successfully!");
      } else {
        setFilteredPosts([data, ...filteredPosts]);
        alert("Post Created Successfully!");
      }

      setFormData({ title: "", body: "" });
      setPostId(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Submit Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // EDIT 
  const postDataGetById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${id}`
      );
      const data = await response.json();

      setFormData({
        title: data.title || "",
        body: data.body || "",
        image: data.image || "",
      });

      setPostId(id);
      setIsOpen(true);
    } catch (error) {
      console.error("GET BY ID API error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  //DELETE
  const openDeleteModal=(id)=>{
    setPostId(id)
    setShowModal(true);
    } 
    const deletePostById = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://6971fb5732c6bacb12c553fb.mockapi.io/Blogpost/${postId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          alert("Failed to delete post");
          return;
        }
        alert("Post Deleted Successfully!");
        setPostId(null);
        fetchData();  // Refresh the list
      } catch (error) {
        console.error("Delete API Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
// const DeletepostById = async (id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this post?");
//   if (!confirmDelete) return;

//   try {
//     setLoading(true);
//     await fetch(
//       `https://696b4a94624d7ddccaa0b724.mockapi.io/createPost/${id}`,
//       { method: "DELETE" }
//     );

//     setFilteredPosts(filteredPosts.filter((item) => item.id !== id));
//     setPosts(posts.filter((item) => item.id !== id));

//     alert("Post Deleted Successfully!");
//   } catch (error) {
//     console.error("Delete error:", error.message);
//   } finally {
//     setLoading(false);
//   }
// };


  //PAGINATION 
  const startIndex = (currentPage - 1) * postsPerPage;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
    <div className={`explore-post ${ctx.mode === "dark" ? "explore-dark" :"explore-light"}`}>
      <div className="explore-post-container">
        <div className="title-search-row">
          <h2 className="explore-title">Explore Posts</h2>

          <div className="search-container">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Search Post..."
              className="search-input"
              value={search}
              onChange={handleSearch}
            /> 
          </div>
        </div>
      </div>
     
      {!isOpen && (
        <button className="btn5" onClick={() => setIsOpen(true)}>
          CreatePost
        </button>
      )}

      {isOpen && (
        <div className="form-wrapper">
          <div className="ex">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              className="in"
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="ex">
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Enter Body"
              className="in"
            />
            {errors.body && <p className="error">{errors.body}</p>}
          </div>

          <button className="btn4" onClick={handleSubmit}>
            {postId ? "Update" : "Submit"}
          </button>

          <button
            className="btun"
            onClick={() => {
              setIsOpen(false);
              setPostId(null);
              setFormData({ title: "", body: "" });
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="explore-cards">
        {filteredPosts
          .slice(startIndex, startIndex + postsPerPage)
          .map((item) => (
            <Card
              key={item.id}
              title={item.title}
              desc={item.body}
              id={item.id}
              from="explore"
              mode={ctx.mode} 
              onEdit={() => postDataGetById(item.id)}
              onDelete={()=> openDeleteModal(item.id)}
            />
          ))}
      </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
        postsPerPage={postsPerPage}
        setPostsPerPage={setPostsPerPage}
      />
      {showModal && (
        <ConfirmationModal
            title = "Delete Post?"
            desc = "Are you sure you want to delete this post? This action cannot be undone."
            onConfirm = {deletePostById}
            onClose = {()=> { setShowModal(false); setPostId(null)}}
            confirmBtnText = "Delete"
            />

      )}

    </>
  );
};

export default ExplorePosts;
