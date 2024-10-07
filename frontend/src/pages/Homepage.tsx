import { Box, Typography } from '@mui/material'

interface HomepageProps {}

const Homepage = (_props: HomepageProps) => {
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
                color="white.main"
                sx={{ height: '64px', width: '96px', backgroundColor: 'secondary.main' }}>
                Secondary color
            </Box>

            <Box sx={{ height: '64px', width: '96px', backgroundColor: 'white.main' }}>
                White color
            </Box>
        </div>
    )
}

export default Homepage
