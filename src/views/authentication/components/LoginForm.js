import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardActions, CardContent } from '@mui/material';
import { Field, reduxForm } from 'redux-form';
import CustomInput from '../../../components/CustomInput';
import { required } from '../../../utils/valdations';
import SendIcon from '@mui/icons-material/Send';

const LoginForm = (props) => {
    const { handleSubmit, submitting } = props;

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 0.5 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
            noValidate
            autoComplete="off"
            id='login-form'
            onSubmit={handleSubmit}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Field
                        name='email'
                        label='Email'
                        component={CustomInput}
                        inputProps={
                            {
                                type: 'email',
                                id: "email"
                            }
                        }
                        validate={required}
                        warn={required}
                    />
                    <Field
                        name='password'
                        label='Password'
                        component={CustomInput}
                        inputProps={{
                            type: 'password',
                            id: "password"
                        }}
                    />
                </CardContent>
                <CardActions>
                    <LoadingButton
                        type='submit'
                        size="medium"
                        // onClick={handleSubmiting}
                        endIcon={<SendIcon />}
                        loading={submitting}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Login
                    </LoadingButton>
                </CardActions>
            </Card>


        </Box>
    )
}

export default reduxForm({
    form: 'login-form',
    enableReinitialize: true
})(LoginForm);