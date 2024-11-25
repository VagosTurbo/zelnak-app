import { TextField, Typography } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { apiPost } from '../api/apiPost'
import { ZelnakButton } from '../components/ZelnakButton'
import { useAuth } from '../context/AuthContext'
import { useCurrentUser } from '../context/CurrentUserContext'
import Layout from './layouts/Layout'
import ZelnakBox from './layouts/ZelnakBox'

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
            setMessage(error.message || 'Error occurred')
        }
    }

    return (
        <Layout>
            <ZelnakBox>
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
                    <ZelnakButton color="primary" type="submit" fullWidth>
                        Add Event
                    </ZelnakButton>
                </form>
                {message && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </ZelnakBox>
        </Layout>
    )
}

export default AddEvent
