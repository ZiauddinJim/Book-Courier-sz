import { createBrowserRouter } from "react-router";
import MainRoute from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Books from "../pages/books/Books";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainRoute,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "/books",
                Component: Books,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/Register",
                Component: Register,
            },
        ]
    },

]);