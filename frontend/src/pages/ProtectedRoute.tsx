import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Routes, LocalStorage } from '../enums';

interface ProtectedRouteProps {
    element: JSX.Element;
    allowedRoles: number[];
}

interface DecodedToken {
    role: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
    const token = localStorage.getItem(LocalStorage.token);

    if (!token) {
        return <Navigate to={Routes.Login} />; // Redirect to login if no token
    }

    try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (!allowedRoles.includes(userRole)) {
            console.log('User not authorized');
            return <Navigate to={Routes.Login} />; // Redirect to login if not authorized
        }

        return element;
    } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to={Routes.Login} />; // Redirect to login if token is invalid
    }
};

export default ProtectedRoute;