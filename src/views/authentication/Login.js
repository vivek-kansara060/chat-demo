import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSyncErrors } from 'redux-form';
import ApiService from '../../services/ApiService';
import LoginForm from './components/LoginForm';
import Authentication from '../../utils/Authenticate';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Authenticate = new Authentication();
    // const Hello = EncryprtionExample['encryption-example']?.default

    const handleLogin = (data) => {
        return ApiService.login('login', data).then(response => {
            Authenticate.setCookie('_pat', { _token: response?.data.token });
            Authenticate.setCookie('_pau', { user: response?.data.user });
            setTimeout(() => {
                return navigate('/chat');
            }, 500)
        }).catch(response => {
            if (response.status === 400) {
                const keys = Object.keys(response.data);
                keys.forEach(key => {
                    dispatch(updateSyncErrors('login-form', {
                        [key]: response.data[key],
                    }))
                })
            }
        });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" minHeight={880} justifyContent="center" alignItems="center">
                <Grid item md={12}>
                    <LoginForm onSubmit={handleLogin} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login;