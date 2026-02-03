import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Createpost from "../Pages/Createpost";
import Signup from "../Pages/Signup";
import  { RootLayout } from "../Pages/Rootlayout";
import Postdetailpage from "./Postdetailpage";
import Nodatafound from "./Nodatafound";
import Explorepost from "./Explorepost";

const router = createBrowserRouter ([
    {
        path:"/Signup",
        element:<Signup/>
    },
    {
        path:"/",
        element:<RootLayout/>,//For navbar 
        children:[
   
    {
        path:"/",
        element:<Homepage/>
    },
    {
        path:"/Post",
        element:<Createpost/>
    },
    {
        path:"/posts/:postId",
        element:<Postdetailpage/>
    },
    
  ],
},
{
    path:"*",
    element:<Nodatafound/>
},
{
    path:"/explorepost",
    element:<Explorepost/>
},

]);
export default router;