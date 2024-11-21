import React, { useState, ChangeEvent, FormEvent } from 'react'
import api from '../api/api'

const Register: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [message, setMessage] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Register
