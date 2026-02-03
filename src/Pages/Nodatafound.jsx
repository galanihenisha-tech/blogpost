import Navbar from "../Component/Navbar"
import Nodatafound from "../assets/lsometric animation.gif"
export const Nodatafound=() =>{
    return(
        <>
        <Navbar/>
        <h2>404 no data found</h2>
        <img src={Nodatafound} alt="No data found" />
        </>
    )
}