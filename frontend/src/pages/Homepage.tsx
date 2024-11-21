import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Routes } from '../enums/Routes'

const Homepage: React.FC = () => {
    return (
        <div>
            <Typography variant="h1">H1</Typography>
            <Typography variant="h2">H2</Typography>
            <Typography variant="h3">H3</Typography>

            <Typography variant="body1">Body 1</Typography>
            <Typography variant="body2">Body 2</Typography>

            <Box sx={{ height: '64px', width: '96px', backgroundColor: 'primary.main' }}>
                Primary color
            </Box>

            <Box
                sx={{
                    height: '64px',
                    width: '96px',
                    backgroundColor: 'secondary.main',
                    color: '#fff',
                }}>
                Secondary color
            </Box>

            <Box sx={{ height: '64px', width: '96px', backgroundColor: '#fff', color: 'black' }}>
                White color
            </Box>

            <Typography variant="h1">Welcome to the Homepage</Typography>
            <nav>
                <Link to={Routes.Register}>Register</Link>
                <Link to={Routes.Login}>Login</Link>
                <Link to={Routes.Products}>All Products</Link>
            </nav>
        </div>
    )
}

export default Homepage
