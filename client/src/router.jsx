import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ProjectDetails from "./components/ProjectDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    children: [
     
    //   {
    //     path: "/project/:id",
    //     element: <ProjectDetails></ProjectDetails>,
    //     // children: [
        
    //     //   {
    //     //     path: "/scroll/marquee",
    //     //     element: ,
    //     //   },
    //     // ],
    //   },
      {
        path: "/*",
        element: <Navigate to={`.`} />,
      },
        ],
    
    },
    {
        path: "/project/:id",
        element: <ProjectDetails></ProjectDetails>,
        // children: [
        
        //   {
        //     path: "/scroll/marquee",
        //     element: ,
        //   },
        // ],
      },
]);
