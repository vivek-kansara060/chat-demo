import React from 'react';
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

function CustomInput(props) {
    const { meta: { error, touched }, label, input, inputProps } = props;
    return (
        <TextField
            {...input}
            error={(touched && error) ? error : false}
            label={label || 'Label'}
            helperText={(touched && error) ? error : null}
            inputProps={{ ...inputProps }}
        />
    )
}

export default CustomInput;