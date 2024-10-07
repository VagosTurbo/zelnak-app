import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/main.scss'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { ThemeProvider } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import App from './App'
import { theme } from './styles/theme'

import 'dayjs/locale/cs'

const Main = () => {
    return (
        <React.StrictMode>
            <AppProviders />
        </React.StrictMode>
    )
}

const AppProviders = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </LocalizationProvider>
    )
}

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(<Main />)
