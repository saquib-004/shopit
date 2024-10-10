import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import Loader from '../layout/Loader';

const ProtectedRoute = ({ admin, children }) => {

    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    if(loading){
        return <Loader/>
    }

    if(!isAuthenticated){
        // if user is not authenticated, then move to '/' url and replace the entire url.
        return <Navigate to="/login" replace />;
    }

    if(admin && user?.role !== 'admin'){
        // if api requires admin login and current user role is not admin, then move to '/' url.
        return <Navigate to="/" replace />;
    }

  return children;
}

export default ProtectedRoute;