import { Navigate, createBrowserRouter } from "react-router-dom";

import App from "./App";
import ContactPage from "./components/ContactPage";
import OwnerAnalytics from "./components/OwnerAnalytics";
import OwnerPanel from "./components/OwnerPanel";
import ProjectDetails from "./components/ProjectDetails";
import SkillDetails from "./components/SkillDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/owner",
    element: <OwnerPanel />,
  },
  {
    path: "/owner/analytics",
    element: <OwnerAnalytics />,
  },
  {
    path: "/project/:id",
    element: <ProjectDetails />,
  },
  {
    path: "/skill/:id",
    element: <SkillDetails />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
