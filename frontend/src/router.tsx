import { createHashRouter } from 'react-router-dom'
import { Routes } from './enums/Routes.ts'
import Homepage from './pages/Homepage.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import ProductsPage from './pages/ProductsPage.tsx'
import Profile from './pages/Profilepage.tsx'
import AddProduct from './pages/AddProduct.tsx'
import Events from './pages/Events.tsx'
import CategoriesPage from './pages/CategoryPage.tsx'
import AddCategory from './pages/AddCategory.tsx'
import FarmerProfile from './pages/FarmerProfile.tsx'

const applicationRouter = createHashRouter([
    {
        path: Routes.Homepage,
        element: <Homepage />,
    },
    {
        path: Routes.Register, // Add this to Routes enum
        element: <Register />,
    },
    {
        path: Routes.Login, // Add this to Routes enum
        element: <Login />,
    },
    {
        path: Routes.Products,
        element: <ProductsPage />,
    },
    {
        path: Routes.Profile,
        element: <Profile />,
    },
    {
        path: Routes.AddProduct, 
        element: <AddProduct />,
    },
    {
        path: Routes.Events,
        element: <Events />,
    },
    {
        path: Routes.Categories,
        element: <CategoriesPage />,
    },
    {
        path: Routes.AddCategory,
        element: <AddCategory />,
    },
    {
        path: '/farmers/:id',
        element: <FarmerProfile />,
    }
])

const getRouter = () => {
    return applicationRouter
}

const router = getRouter()
export { router }
