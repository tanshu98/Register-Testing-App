import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        const LoggedUser = JSON.parse(localStorage.getItem('user') || '{}')

        return (
            <Box>
                <Box component={'h1'} data-testid='homeHeading'>User Details</Box>
                <Box component={'h2'}>{LoggedUser.name}</Box>
                <Typography>{LoggedUser.email}</Typography>
                <Typography>{LoggedUser.mobile}</Typography>
            </Box>
        )
    }
}
