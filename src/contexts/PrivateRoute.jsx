import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    // if (loading) {
    //     return <Spinner />
    // }
    if (user) {
        return children;
    } return <Navigate state={location.pathname} to={"/login"} />
};

export default PrivateRoute;