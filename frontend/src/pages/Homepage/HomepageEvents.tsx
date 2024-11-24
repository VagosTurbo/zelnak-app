import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums'
import colors from '../../styles/colors'
import { Event } from '../../types/Event'
import { useAuth } from '../../context/AuthContext'
import { apiPost } from '../../api/apiPost'
import { apiGet } from '../../api/apiGet'
import { apiDelete } from '../../api/apiDelete'
import { formatDate } from '../../utils/myUtils'
import { User } from '../../types/User'

interface HomepageEventsProps {
    events: Event[]
    users: User[]
}

export const HomepageEvents: React.FC<HomepageEventsProps> = ({ events, users }) => {
    const { authenticated, userId, accessToken } = useAuth()

    const [userRegisteredEvents, setUserRegisteredEvents] = useState<Event[]>([])

    const fetchUserEvents = async () => {
        if (!authenticated || !accessToken) return

        try {
            const response = await apiGet<number[]>(`/users/${userId}/events`, accessToken)
            const userEvents = events.filter((event) => response.includes(event.id))
            setUserRegisteredEvents(userEvents)
        } catch (err: any) {
            console.error('Failed to fetch user events', err)
        }
    }

    const signUpForEvent = async (eventId: number) => {
        if (!authenticated || !accessToken) return

        try {
            const response = await apiPost<any>(`/users/${userId}/events`, { eventId }, accessToken)
            console.log(response)
        } catch (err: any) {
            console.error('Failed to add event', err)
        }
    }

    const signOffFromEvent = async (eventId: number) => {
        if (!authenticated || !accessToken) return

        try {
            const response = await apiDelete<any>(`/users/${userId}/events/${eventId}`, accessToken)
            console.log(response)
        } catch (err: any) {
            console.error('Failed to remove event', err)
        }
    }

    const getNameOfUserById = (userId: number) => {
        const user = users.find((user) => user.id === userId)
        return user ? user.username : 'Unknown'
    }

    const isUserRegisteredForEvent = (eventId: number) => {
        return userRegisteredEvents.some((event) => event.id === eventId)
    }

    useEffect(() => {
        if (events.length) {
            fetchUserEvents()
        }
    }, [events])

    return (
        <>
            <Typography variant="h1" component="h2" mb={3} textAlign="center">
                Události
            </Typography>
            <Box
                className="all-events"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 2,
                    mb: 5,
                }}>
                {events.map((event, index) => (
                    <Card key={index}>
                        <CardContent>
                            <CardActionArea>
                                <Link
                                    to={`${Routes.Events}/${event.id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h4"
                                        sx={{ color: colors.colorText }}>
                                        {event.name}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                {event.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Datum: {formatDate(event.date)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }}>
                                Místo: {event.location}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.colorText }} mb={2}>
                                Akci vytvořil:&nbsp;
                                <Link to={`${Routes.Seller}/${event.user_id}`}>
                                    {getNameOfUserById(event.user_id)}
                                </Link>
                            </Typography>
                            {authenticated ? (
                                <>
                                    {isUserRegisteredForEvent(event.id) ? (
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            sx={{
                                                mt: 'auto',
                                            }}
                                            onClick={() => signOffFromEvent(event.id)}
                                            fullWidth>
                                            Odhlásit se
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => signUpForEvent(event.id)}
                                            color="secondary"
                                            variant="contained"
                                            sx={{
                                                mt: 'auto',
                                            }}
                                            fullWidth>
                                            Zapsat se na událost
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <Typography variant="body2" sx={{ color: colors.colorText }}>
                                    Pro zápis na událost se musíte přihlásit
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Button>Vytvořit novou událost</Button>
        </>
    )
}
