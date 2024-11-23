import React from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from '../enums';

interface ProtectedRouteProps {
    element: JSX.Element;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
    const userRole = localStorage.getItem('userRole'); // Assuming userRole is stored in localStorage

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={Routes.Login} />; // Redirect to login if not authorized
    }

    return element;
};

export default ProtectedRoute;