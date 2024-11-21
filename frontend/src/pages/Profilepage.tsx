import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import { LocalStorage } from '../enums'
import { apiGet } from '../api/apiGet'

interface User {
    id: number
    username: string
    email: string
    created_at: string
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem(LocalStorage.token)
                const userId = localStorage.getItem(LocalStorage.UserId)

                if (!token || !userId) {
                    setError('User is not authenticated')
                    setLoading(false)
                    return
                }

                const response = await apiGet<User>(`/users/${userId}`, token)
                setUser(response)
                setUsername(response.username) // Pre-fill the username field
                setEmail(response.email) // Pre-fill the email field
            } catch (err: any) {
                setError(err.message || 'Failed to fetch profile data')
            } finally {
                setLoading(false)
            }
        }

        fetchUserProfile()
    }, [])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem(LocalStorage.token)
        const userId = localStorage.getItem(LocalStorage.UserId)

        if (!token || !userId) {
            setError('User is not authenticated')
            return
        }

        try {
            // Send the current password along with the updated fields
            const response = await apiGet(`/users/${userId}`, token) // Here, send the updated details to backend (to be implemented in your backend)
            setUser(response)

            setSuccess('Profile updated successfully!')
        } catch (err: any) {
            setError('Failed to update profile')
        }
    }

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    if (error) {
        return <Typography color="error">{error}</Typography>
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
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 400,
                    textAlign: 'center',
                }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile
                </Typography>
                {user && (
                    <>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>ID:</strong> {user.id}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Username:</strong> {user.username}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Account Created:</strong>{' '}
                            {new Date(user.created_at).toLocaleString()}
                        </Typography>
                    </>
                )}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">Update Profile</Typography>

                    <form onSubmit={handleUpdateProfile}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Current Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Update Profile
                        </Button>
                    </form>

                    {success && (
                        <Typography color="success.main" sx={{ mt: 2 }}>
                            {success}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}

export default Profile
