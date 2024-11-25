import { Box, Button, TextField, Typography } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { apiPost } from '../api/apiPost'
import { useAuth } from '../context/AuthContext'
import { useCurrentUser } from '../context/CurrentUserContext'

interface User {
    id: number
    username: string
}

const AddEvent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        user_id: 0,
    })
    const [message, setMessage] = useState('')
    const { currentUser } = useCurrentUser()
    const { accessToken } = useAuth()

    const handleSetValue = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (!accessToken || !currentUser) {
                setMessage('User is not authenticated')
                return
            }

            formData.user_id = currentUser?.id
            const response = await apiPost<any>(
                '/events',
                {
                    ...formData,
                    created_at: new Date().toISOString(),
                },
                accessToken
            )
            setMessage(response.message || 'Event added successfully!')
        } catch (error: any) {
            setMessage(error.response?.message || 'Error occurred')
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}>
            <Box
                sx={{
                    width: 400,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Event
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleSetValue('name', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={formData.description}
                        onChange={(e) => handleSetValue('description', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Date"
                        variant="outlined"
                        type="datetime-local"
                        fullWidth
                        value={formData.date}
                        onChange={(e) => handleSetValue('date', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={formData.location}
                        onChange={(e) => handleSetValue('location', e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Add Event
                    </Button>
                </form>
                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default AddEvent
