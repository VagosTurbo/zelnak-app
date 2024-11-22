import React, { useState, FormEvent } from 'react'
import { Box, Button, Typography } from '@mui/material'
import api from '../api/api'
import { ZelnakInput } from '../components/ZelnakInput'
import Navbar from '../components/Navbar'
import { ZelnakButton } from '../components/ZelnakButton'

const Register: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [message, setMessage] = useState('')

    // Updates form data when any field changes
    const handleSetValue = (key: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/register', formData)
            setMessage(response.data.message || 'Registration successful!')
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
                    Register
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
                        title="Email"
                        type="email"
                        inputKey="email"
                        value={formData.email}
                        setValue={handleSetValue}
                        placeholder="Enter your email"
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
                    {/* <Button variant="contained" color="primary" type="submit" fullWidth>
                        Register
                    </Button> */}
                    <ZelnakButton color="primary" type="submit" fullWidth>
                        Register
                    </ZelnakButton>
                </form>
                {message && (
                    <Typography color="success.main" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default Register
