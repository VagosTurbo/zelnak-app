// frontend/src/pages/FarmerProfile.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../api/api';

interface Farmer {
    id: number;
    username: string;
    email: string;
    // Add other fields as necessary
}

const FarmerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setFarmer(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch farmer');
            }
        };

        fetchFarmer();
    }, [id]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!farmer) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Farmer Profile
            </Typography>
            <Typography variant="h5" component="div">
                {farmer.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Email: {farmer.email}
            </Typography>
            {/* Add other farmer details here */}
        </Box>
    );
};

export default FarmerProfile;