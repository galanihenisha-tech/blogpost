import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import { Newpost } from "../Pages/Newpost";
import { Loginpage } from "../Pages/Loginpage";
import { RootLayout } from "../Pages/Rootlayout";
import { Children } from "react";
import { PostDetail } from "./PostDetail";
import Authgaurd from "../Guard/Authguard";
import NotFound from "./NotFound";
import  { ExplorePostPage } from "../Pages/ExplorePostPage";
import Footer from "./Footer";
import Pagination from "./Pagination";
import Editprofilemodal from "./Editprofilemodal";


export const router = createBrowserRouter([
    
    {
        path: "/login",
        element: <Loginpage/>
    },
    {
        path: "/",
        element: <Authgaurd/>,
        children: [
        {
            path: "/",
            element: <Homepage/>
        },
        {
            path: "/new-post",
            element: <Newpost/>
        },
        {
            path:"/posts/:postId",    //dynamic id
            element:<PostDetail/>
        },
        {
            path:"/explorepost",
            element:<ExplorePostPage/>
        },
        {
            path:"/editprofile",
            element:<Editprofilemodal/>
        },
    ],
    },
    
    {
        path:"*",
        element:<NotFound/>
    }
]);

    
    