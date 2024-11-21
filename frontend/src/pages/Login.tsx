import React, { useState, ChangeEvent, FormEvent } from 'react'
import api from '../api/api'

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/login', formData)
            setToken(response.data.token)
            setMessage('Login successful!')
            // TODO: tu este treba ulozit session token a pouzivat ho pri api requestoch
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error occurred')
        }
    }

    return (
        <div>
            <h2>Login</h2>
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {token && <p>Your token: {token}</p>}
        </div>
    )
}

export default Login
