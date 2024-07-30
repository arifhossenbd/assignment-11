import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Blogs from "../Pages/Home/Blogs/Blogs";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import FeaturesBlog from "../Pages/Home/FeaturesBlog/FeaturesBlog";
import WishList from "../Pages/Home/WishList/WishList";
import Foods from "../Pages/Foods/Foods";
import Health from "../Pages/Health/Health";
import Technology from "../Pages/Technology/Technology";
import Fashion from "../Pages/Fashion/Fashion";
import Travel from "../Pages/Travel/Travel";
import About from "../Pages/Home/About/About";
import UpdateBlog from "../Pages/Home/UpdateBlog/UpdateBlog";
import AddBlog from "../Pages/Home/AddBlog/AddBlog";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/blogs",
                element: <Blogs/>
            },
            {
                path: "/blog/details/:id",
                element: <PrivateRoute><BlogDetails/></PrivateRoute>
            },
            {
                path: "/blogs/feature",
                element: <FeaturesBlog/>
            },
            {
                path: "/blogs/wishlist",
                element: <PrivateRoute><WishList/></PrivateRoute>
            },
            {
                path: "/blogs/food",
                element: <Foods />
            },
            {
                path: "/blogs/health",
                element: <Health />
            },
            {
                path: "/blogs/technology",
                element: <Technology />
            },
            {
                path: "/blogs/fashion",
                element: <Fashion />
            },
            {
                path: "/blogs/travel",
                element: <Travel />
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    },
    {
        path: "/blog/update/:id",
        element: <PrivateRoute><UpdateBlog/></PrivateRoute>,
    },
    {
        path: "/blog/create",
        element: <PrivateRoute><AddBlog/></PrivateRoute>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registration",
        element: <Registration/>
    },
])

export default router