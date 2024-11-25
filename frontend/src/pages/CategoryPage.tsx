import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Switch,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
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
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null) // Menu anchor
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null) // Category to edit

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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, category: Category) => {
        setMenuAnchorEl(event.currentTarget)
        setCategoryToEdit(category)
    }

    const handleMenuClose = () => {
        setMenuAnchorEl(null)
        setCategoryToEdit(null)
    }

    const handleEditCategory = () => {
        if (categoryToEdit) {
            // Navigate to edit page or open an edit dialog (example)
            console.log(`Editing category: ${categoryToEdit.name}`)
        }
        handleMenuClose()
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
                            onClick={(event) => handleMenuOpen(event, category)}
                            aria-label="menu"
                            sx={{ marginLeft: 2 }}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={handleMenuClose}>
                            <MenuItem onClick={handleEditCategory}>Edit</MenuItem>
                            <MenuItem onClick={() => confirmDeleteCategory(category)}>
                                Delete
                            </MenuItem>
                        </Menu>
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
