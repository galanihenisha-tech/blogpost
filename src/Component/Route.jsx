import { createBrowserRouter } from "react-router-dom";
import{ HomePage } from "../Page/HomePage";
import { NewPost } from "../Page/NewPost";

import { Loginform } from "../Page/Loginform";
export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Loginform/>
    },

    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/new-post",
        element:<NewPost/>
    }
])