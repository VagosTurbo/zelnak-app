// frontend/src/pages/Events.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { apiGet } from '../api/apiGet';

interface Event {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    user_id: number;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiGet('/events');
                setEvents(response);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch events');
            }
        };

        fetchEvents();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {events.map((event) => (
                    <Card key={event.id} sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Date: {new Date(event.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Location: {event.location}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Events;