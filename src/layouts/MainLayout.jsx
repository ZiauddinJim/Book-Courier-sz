import { createBrowserRouter } from "react-router";
import MainRoute from "../routes/MainRoute";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainRoute,
        children: [
            {
                path: "/",
                Component: Home,
            }
        ]
    },
]);