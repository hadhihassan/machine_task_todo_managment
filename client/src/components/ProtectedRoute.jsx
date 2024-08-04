import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { auth } = useContext(AuthContext);
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export const LogedUsers = () => {
    const { auth } = useContext(AuthContext);
    return !auth ? <Outlet /> : <Navigate to="/" />;
};