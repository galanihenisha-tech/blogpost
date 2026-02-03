import { Navigate } from "react-router-dom";
import { RootLayout } from "../Pages/Rootlayout";

export default function Authgaurd() {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    
    if(!loginData) {
        //using replace not add a new entry,ovewrite the current one
        return <Navigate to="/login" replace />;
    }
    return <RootLayout/>;
}