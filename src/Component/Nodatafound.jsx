import Navbar from "./Navbar";
import loader from "../assets/Rocket loader.gif";
export default function Nodatafound() {
    return(
        <>
        <Navbar/>
        <div style={{textAlign:"center",padding:"40px"}}>
         

         <img src={loader} alt="loding..." style={{width: 180}} />

        </div>
        </>
    )
}