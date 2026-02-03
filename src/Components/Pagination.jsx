import "./Pagination.css";

export default function Pagination  ({currentPage,totalPages,onPrev,onNext,postsPerPage,setPostsPerPage}) {

    //props destructuring
    //const {currentPage,totalPages,onPrev,onNext} = props

    return(
        <div className="pagination-container">
            <div>
                <select onChange={(e) => setPostsPerPage(e.target.value)} value={postsPerPage}>
                    <option value="25">10</option>
                    <option value="50">20</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>
            <button className="prev-btn" 
                onClick={onPrev} 
                disabled={currentPage == 1}>
                 Prev
                </button>

            <span className="pagination-info">
                 {currentPage} of {totalPages}
            </span>

            <button className="next-btn"
                  onClick={onNext}
                  disabled={currentPage === totalPages}>
                  Next
                </button>
        </div>
    );

};