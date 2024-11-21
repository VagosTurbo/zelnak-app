import React, { useState, FormEvent } from 'react'
import { Box, Button, Typography } from '@mui/material'
import api from '../api/api'
import { ZelnakInput } from '../components/ZelnakInput'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from '../enums'

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    // Updates form data when any field changes
    const handleSetValue = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/login', formData)
            const token = response.data.token
            const userId = response.data.id

            // Store token and userId in localStorage using the LocalStorage enum
            localStorage.setItem(LocalStorage.token, token)
            localStorage.setItem(LocalStorage.UserId, userId)

            setToken(token)
            setMessage('Login successful!')

            navigate('/')
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error occurred')
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
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <ZelnakInput
                        title="Username"
                        type="text"
                        inputKey="username"
                        value={formData.username}
                        setValue={handleSetValue}
                        placeholder="Enter your username"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <ZelnakInput
                        title="Password"
                        type="password"
                        inputKey="password"
                        value={formData.password}
                        setValue={handleSetValue}
                        placeholder="Enter your password"
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>
                </form>
                {message && (
                    <Typography
                        color={message.includes('successful') ? 'primary' : 'error'}
                        sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
                {token && (
                    <Typography color="success.main" sx={{ mt: 1, wordWrap: 'break-word' }}>
                        Your token: {token}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default Login
