import { createHashRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { Routes } from './enums/Routes.ts'
import { UserRole } from './enums/UserRole.ts'
import AddCategory from './pages/AddCategory.tsx'
import AddProduct from './pages/AddProduct.tsx'
import AdminPage from './pages/AdminPage.tsx'
import Cart from './pages/Cart.tsx'
import CategoriesPage from './pages/CategoryPage.tsx'
import Events from './pages/Events.tsx'
import FarmerProfile from './pages/FarmerProfile.tsx'
import Homepage from './pages/Homepage/Homepage.tsx'
import Login from './pages/Login.tsx'
import ProductsPage from './pages/ProductsPage.tsx'
import OrderDetail from './pages/Profile/OrderDetail.tsx'
import ProfilePage from './pages/Profile/ProfilePage.tsx'
import Register from './pages/Register.tsx'
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
        element: (
            <ProtectedRoute
                element={<OrderDetail />}
                allowedRoles={[UserRole.Admin, UserRole.Customer]}
            />
        ),
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
        element: (
            <ProtectedRoute element={<CategoriesPage />} allowedRoles={[UserRole.Moderator]} />
        ),
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
