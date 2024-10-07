import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Routes } from '../enums'

interface ProtectedRouteProps {
    element: JSX.Element
    by?: 'all'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, by }) => {
    const [condition, setCondition] = useState<boolean>(true)

    useEffect(() => {
        if (by === 'all') {
            setCondition(false)
        }
    }, [])

    return condition ? element : <Navigate to={Routes.Homepage} />
}

export default ProtectedRoute
