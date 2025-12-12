import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import Books from "../pages/books/Books";
import BookDetails from "../pages/books/BookDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgetPassword from "../pages/auth/ForgetPassword";
import MyOrders from "../pages/dashboard/user/MyOrders";
import MyProfile from "../pages/dashboard/shared/MyProfile";
import Invoices from "../pages/dashboard/user/Invoices";
import MyWishlist from "../pages/dashboard/user/MyWishlist";
import AddBook from "../pages/dashboard/librarian/AddBook";
import MyBooks from "../pages/dashboard/librarian/MyBooks";
import LibrarianOrders from "../pages/dashboard/librarian/LibrarianOrders";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import ManageBooks from "../pages/dashboard/admin/ManageBooks";
import PrivateRoute from "./PrivateRoute";
import EditBook from "../pages/dashboard/librarian/EditBook";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import PaymentSuccess from "../pages/dashboard/user/payment/PaymentSuccess";
import PaymentCancel from "../pages/dashboard/user/payment/PaymentCancel";

import ErrorPage from "../pages/shared/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            // Main Routes
            { path: "/", Component: Home, },
            { path: "/books", Component: Books, },
            { path: "/books/:id", Component: BookDetails, },

            // Auth Routes
            { path: "/login", Component: Login, },
            { path: "/Register", Component: Register, },
            { path: "/forgetPassword", Component: ForgetPassword, },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardLayout /></PrivateRoute>,
        children: [
            { index: true, Component: Dashboard },
            // User Routes
            { path: "orders", Component: MyOrders },
            { path: "payment-success", Component: PaymentSuccess },
            { path: "payment-cancelled", Component: PaymentCancel },
            { path: "profile", Component: MyProfile },
            { path: "invoices", Component: Invoices },
            { path: "wishlist", Component: MyWishlist },

            // Librarian Routes
            { path: "add-book", element: <LibrarianRoute><AddBook /></LibrarianRoute> },
            { path: "my-books", element: <LibrarianRoute><MyBooks /></LibrarianRoute> },
            { path: "librarian-orders", element: <LibrarianRoute><LibrarianOrders /></LibrarianRoute> },
            { path: "editBook/:id", element: <LibrarianRoute><EditBook /></LibrarianRoute> },

            // Admin Routes
            { path: "all-users", element: <AdminRoute><AllUsers /></AdminRoute> },
            { path: "manage-books", element: <AdminRoute><ManageBooks /></AdminRoute> },
        ]
    }
]);
