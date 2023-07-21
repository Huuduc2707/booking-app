import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#3AC65E',
        },
    },
})

const MUIThemeProvider = ({ children }
    : {
        children: React.ReactNode,
    }) => {
        
        return ( <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>)
    }

export default MUIThemeProvider;
