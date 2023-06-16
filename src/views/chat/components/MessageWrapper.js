import { Stack } from '@mui/material';
import React from 'react';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

export default function MessageWrapper(props) {
    const { messages, authUser } = props;

    return (
        <Stack spacing={2}>
            {messages.map(message => (
                <>
                    {message.senderId !== authUser.id
                        ?
                        <LeftMessage key={message.id} message={message} />
                        :
                        <RightMessage key={message.id} message={message} />}
                </>
            ))}
        </Stack>
    )
}