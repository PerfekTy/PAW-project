import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Wardrobe from "./pages/Wardrobe";
import AccountForm from "./pages/AccountForm";
import Delivery from "./pages/Delivery";
import Payments from "./pages/Payments";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/account/details",
                element: <Account />,
            },
            {
                path: "/account/details/:nickname",
                element: <AccountForm />,
            },
            {
                path: "/account/delivery",
                element: <Delivery />,
            },
            {
                path: "/account/payment",
                element: <Payments />,
            },
            {
                path: "/wardrobe",
                element: <Wardrobe />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
