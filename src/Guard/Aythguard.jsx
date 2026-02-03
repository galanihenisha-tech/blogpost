import { Navigate, Outlet } from "react-router-dom";
import { RootLayout } from "../Pages/Rootlayout";
export default function Authguard() {
    const LoginData = JSON.parse(localStorage.getItem("logindata"));

    if(!LoginData){
        //using replace not add a new entry,overwrite the current one
        return <Navigate to="/Login" replace />;
    }
    return <RootLayout/>;
}