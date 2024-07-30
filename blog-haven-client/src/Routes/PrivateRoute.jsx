/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    if (user?.email) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;