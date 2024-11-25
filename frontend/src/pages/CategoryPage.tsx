import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Switch,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/api'

interface Category {
    id: number
    name: string
    parent_id: number | null
    is_approved: boolean
}

interface Attribute {
    id: number
    name: string
    is_required: boolean
    category_id: number
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [attributes, setAttributes] = useState<Attribute[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false) // Dialog open state
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null) // Category to delete

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories')
                setCategories(response.data)
            } catch (err: any) {
                console.error('Failed to fetch categories', err)
            }
        }

        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategory !== null) {
            const fetchAttributes = async () => {
                try {
                    const response = await api.get(`/attributes/${selectedCategory}`)
                    setAttributes(response.data)
                } catch (err: any) {
                    console.error('Failed to fetch attributes', err)
                }
            }

            fetchAttributes()
        }
    }, [selectedCategory])

    const handleApprovalToggle = async (categoryId: number, currentApprovalStatus: boolean) => {
        try {
            await api.put(`/categories/${categoryId}/toggle`, {})
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === categoryId
                        ? { ...category, is_approved: !currentApprovalStatus }
                        : category
                )
            )
        } catch (err: any) {
            console.error('Failed to update category approval', err)
        }
    }

    const handleDeleteCategory = async () => {
        if (categoryToDelete) {
            try {
                await api.delete(`/categories/${categoryToDelete.id}`)
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category.id !== categoryToDelete.id)
                )
            } catch (err: any) {
                console.error('Failed to delete category', err)
            }
        }
        setDialogOpen(false)
        setCategoryToDelete(null)
    }

    const confirmDeleteCategory = (category: Category) => {
        setCategoryToDelete(category)
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
        setCategoryToDelete(null)
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText
                            primary={category.name}
                            onClick={() => setSelectedCategory(category.id)}
                            style={{ cursor: 'pointer' }}
                        />
                        <Switch
                            checked={category.is_approved}
                            onChange={() => handleApprovalToggle(category.id, category.is_approved)}
                            name="approvalToggle"
                            color="primary"
                        />
                        <IconButton
                            color="error"
                            onClick={() => confirmDeleteCategory(category)}
                            aria-label="delete"
                            sx={{ marginLeft: 2 }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            {selectedCategory && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Attributes for Selected Category
                    </Typography>
                    <List>
                        {attributes.map((attribute) => (
                            <ListItem key={attribute.id}>
                                <ListItemText
                                    primary={attribute.name}
                                    secondary={attribute.is_required ? 'Required' : 'Optional'}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the category "{categoryToDelete?.name}"?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCategory} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CategoriesPage
