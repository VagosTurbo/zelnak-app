import { createHashRouter } from 'react-router-dom'
import { Routes } from './enums/Routes.ts'
import Homepage from './pages/Homepage/Homepage.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import ProductsPage from './pages/ProductsPage.tsx'
import AddProduct from './pages/AddProduct.tsx'
import Events from './pages/Events.tsx'
import CategoriesPage from './pages/CategoryPage.tsx'
import AddCategory from './pages/AddCategory.tsx'
import FarmerProfile from './pages/FarmerProfile.tsx'
import AdminPage from './pages/AdminPage.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import { UserRole } from './enums/UserRole.ts'
import Cart from './pages/Cart.tsx'
import OrderDetail from './pages/Profile/OrderDetail.tsx'
import ProfilePage from './pages/Profile/ProfilePage.tsx'
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
        element: <ProfilePage />,
    },
    {
        path: Routes.Orders + '/:id',
        element: <ProtectedRoute element={<OrderDetail />} allowedRoles={[UserRole.Admin]} />,
        // TODO: roles
    },

    {
        path: Routes.AddProduct,
        element: (
            <ProtectedRoute
                element={<AddProduct />}
                allowedRoles={[UserRole.Farmer, UserRole.Registered]}
            />
        ),
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
    },
    {
        path: '/admin',
        element: <ProtectedRoute element={<AdminPage />} allowedRoles={[UserRole.Admin]} />,
    },
    {
        path: Routes.Cart,
        element: <Cart />,
    },
])

const getRouter = () => {
    return applicationRouter
}

const router = getRouter()
export { router }
