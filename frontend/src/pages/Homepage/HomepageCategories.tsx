import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { UrlParams } from '../../enums/UrlParams'
import { Category } from '../../types/Category'

interface HomepageCategoriesProps {
    categories: Category[]
}

export const HomepageCategories: React.FC<HomepageCategoriesProps> = ({ categories }) => {
    return (
        <>
            <Typography variant="h1" component="h2" mb={3} textAlign="center">
                Categories
            </Typography>
            <Box
                className="all-categories"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 2,
                    mb: 5,
                }}>
                {categories.map((category, index) => (
                    <Card key={index}>
                        <CardContent>
                            <CardActionArea>
                                <Link
                                    to={`?${UrlParams.Category}=${category.id}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {category.name}
                                    </Typography>
                                </Link>
                            </CardActionArea>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    )
}
