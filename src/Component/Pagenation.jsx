import "./Pagenation.css"

export const Pagenation =({currentPage,totalPages,onPrev,onNext}) =>{

        return(
            <>
            <div className="pagenation">
            
            <select onChange={(e)=> handlePostsPerPage}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={35}>35</option>
                <option value={40}>40</option>
                <option value={45}>45</option>
            </select>
            <button className="btn"
            onClick={onPrev} 
            disabled={currentPage === 1}>
                Prev</button>
            
            <label className="btn-info">
                {currentPage} of {totalPages}
             </label>

            <button className="btn-next"
             disabled={currentPage === totalPages}
             onClick={onNext} >Next</button>
            </div>
            </>
        )
    }