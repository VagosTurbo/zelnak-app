import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { Category } from '../../types/Category'
import { UrlParams } from '../../enums/UrlParams'

interface HomepageCategoriesProps {
    categories: Category[]
}

export const HomepageCategories: React.FC<HomepageCategoriesProps> = ({ categories }) => {
    return (
        <>
            <Typography variant="h1" component="h2" mb={3} textAlign="center">
                Kategorie
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
