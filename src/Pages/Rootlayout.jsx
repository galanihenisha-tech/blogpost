import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";
export function RootLayout () {
    return(
        <>
            <Navbar/>
            {/* define nested routes */}
            <Outlet/>
            <Footer />
        </>
    );
}