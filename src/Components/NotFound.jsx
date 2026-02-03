import { Navbar } from "./Navbar";
import Lottie from "react-lottie-player";
import errorAnimation from "../assets/Error 404.json";

export default function NotFound() {
    return(
        <>
           <Navbar/>
           <div
        style={{
        position: "fixed",
        
        // width: "100vw",
        // height: "100vh",
        // backgroundColor: "rgba(255,255,255,0.8)",
        marginLeft:"600px",
        margin:"250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
     <Lottie
        loop
        animationData={errorAnimation}
        play
        style={{ width: 200, height: 200 }}
      />
       <p style={{ marginTop: 20, fontSize: 18, color: "#555" }}>error</p>
    </div>
           <div style={{textAlign:"center",padding:"40px"}}>
           <h1>404-Page Not Found</h1>
            <p>The Page you are Looking for does not exist</p>
           </div>
            
        </>
    );
}