import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';
import api from '../api/api';
import { UserRole, UserRoleLabel } from '../enums/UserRole';

interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (err: any) {
                console.error('Failed to fetch users', err);
                setError(err.response?.data?.message || 'Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: number, newRole: UserRole) => {
        try {
            await api.put(`/users/${userId}`, { role: newRole.toString() });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (err: any) {
            console.error('Failed to update user role', err);
            setError(err.response?.data?.message || 'Failed to update user role');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin - Manage User Roles
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.username} secondary={user.email} />
                        <Select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, parseInt(e.target.value as string) as UserRole)}
                        >
                            {Object.keys(UserRole)
                                .filter(key => isNaN(Number(key))) // Filter out numeric values
                                .map((role) => (
                                    <MenuItem key={UserRole[role as keyof typeof UserRole]} value={UserRole[role as keyof typeof UserRole]}>
                                        {UserRoleLabel[UserRole[role as keyof typeof UserRole]]}
                                    </MenuItem>
                                ))}
                        </Select>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AdminPage;