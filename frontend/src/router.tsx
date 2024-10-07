import { createHashRouter } from 'react-router-dom'
import { Routes } from './enums/Routes.ts'
import Homepage from './pages/Homepage.tsx'

const applicationRouter = createHashRouter([
    {
        path: Routes.Homepage,
        element: <Homepage />,
    },
])

const getRouter = () => {
    return applicationRouter
}

const router = getRouter()
export { router }
