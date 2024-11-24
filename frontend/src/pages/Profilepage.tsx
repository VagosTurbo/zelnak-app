import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import { LocalStorage } from '../enums'
import { ZelnakButton } from '../components/ZelnakButton'
import { apiPut } from '../api/apiPut'
import { apiGet } from '../api/apiGet'

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [initialUser, setInitialUser] = useState<User | null>(null)
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem(LocalStorage.token)
            const userId = localStorage.getItem(LocalStorage.UserId)

            if (!token || !userId) {
                setError('User is not authenticated')
                setLoading(false)
                return
            }

            try {
                const response = await apiGet<User>(`/users/${userId}`, token)
                setUser(response)
                setInitialUser(response) // Store the initial user data
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
            // Prepare the updated user details
            const updatedDetails: Partial<User> = {}
            if (username !== initialUser?.username) updatedDetails.username = username
            if (email !== initialUser?.email) updatedDetails.email = email
            // Add other fields as necessary

            // Send the updated details to the backend
            const response = await apiPut(`/users/${userId}`, updatedDetails, token)
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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
            }}
        >
            <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '500px' }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Box component="form" onSubmit={handleUpdateProfile}>
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
                    <ZelnakButton color="primary" type="submit" fullWidth>
                        Update Profile
                    </ZelnakButton>
                </Box>

                {success && (
                    <Typography color="success.main" sx={{ mt: 2 }}>
                        {success}
                    </Typography>
                )}
            </Paper>
        </Box>
    )
}

export default ProfilePage