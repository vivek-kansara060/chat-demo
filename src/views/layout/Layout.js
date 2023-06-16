import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Authentication from '../../utils/Authenticate';
import Header from './components/Header';

export default function Layout(props) {
    const navigate = useNavigate();
    const Authenticate = new Authentication();

    // useEffect(() => {
    //     if (!Authenticate.isAuthenticated()) {
    //         return navigate("/login", { replace: true });
    //     }
    // }, []);

    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container spacing={2} direction="row" minHeight={880} justifyContent="center" alignItems="center" position='relative' left='20%' right="20%"
                    width="calc(60% + 16px);">
                    <Outlet />
                </Grid>
            </Box>
        </>
    )
}