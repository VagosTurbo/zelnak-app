import { Typography } from '@mui/material'

import { Order } from '../../types/Order'

import { Box } from '@mui/material'

import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums'
// import { useAuth } from '../../context/AuthContext'
// import { useCurrentUser } from '../../context/CurrentUserContext'
import { ZelnakButton } from '../../components/ZelnakButton'
import { OrderStatus } from '../../enums/OrderStatus'
import { formatDateTime } from '../../utils/myUtils'

const columnsEnum = {
    id: 'id',
    detail: 'detail',
    status: 'status',
    created_at: 'created_at',
    accept: 'accept',
}

interface ProfileOrdersProps {
    orders: Order[]
    loading: boolean
    showFarmerButtons: boolean
}

const ProfileOrders = (props: ProfileOrdersProps) => {
    const { orders, loading, showFarmerButtons } = props

    // const { accessToken, userId } = useAuth()
    // const { isAdmin } = useCurrentUser()
    const apiRef = useGridApiRef()

    const handleAcceptOrder = async (orderId: number) => {
        console.log('Accepting order', orderId)

        // TODO
    }

    const columns: GridColDef<Order>[] = [
        {
            field: columnsEnum.id,
            width: 40,
            headerName: 'ID',
        },
        {
            field: columnsEnum.detail,
            width: 140,
            headerName: 'Detail',

            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`${Routes.Orders}/${params.row?.id}`}>
                        <ZelnakButton variant="primary">Detail</ZelnakButton>
                    </Link>
                )
            },
        },
        {
            field: columnsEnum.status,
            width: 160,
            headerName: 'Status',

            valueGetter: (_value, row: Order) => {
                return OrderStatus[row.status]
            },
        },
        {
            field: columnsEnum.created_at,
            width: 160,
            headerName: 'Created at',

            valueGetter: (_value, row: Order) => {
                return formatDateTime(row.created_at)
            },
        },
        {
            field: columnsEnum.accept,
            width: 160,
            headerName: 'Accept order',
            renderCell: (params) => {
                const row = params.row as Order
                const orderId = row.id

                return (
                    showFarmerButtons && (
                        <ZelnakButton variant="primary" onClick={() => handleAcceptOrder(orderId)}>
                            Accept
                        </ZelnakButton>
                    )
                )
            },
        },
    ]

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>

            <Box
                component="fieldset"
                sx={{
                    display: 'grid',
                    overflowX: 'auto',
                }}>
                <DataGrid
                    apiRef={apiRef}
                    density="standard"
                    sx={{}}
                    rows={orders}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                        columns: {
                            columnVisibilityModel: {
                                [columnsEnum.accept]: showFarmerButtons,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    autoHeight // fix infinite expanding
                    loading={loading}
                />
            </Box>
        </>
    )
}

export default ProfileOrders
