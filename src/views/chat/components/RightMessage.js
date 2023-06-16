import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '9px 15px',
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'lightyellow',
    '-webkit-filter': 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))',
    filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))',
    width: '50%',
    marginLeft: '15px',
    right: '45%',
    left: '45%',
}));
export default function RightMessage(props) {
    const { message } = props;
    return (
        <Item className='chat-right-message'>
            <Typography> {message.message}</Typography>
        </Item>
    );
}