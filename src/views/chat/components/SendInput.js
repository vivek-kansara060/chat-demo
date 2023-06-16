import React, { useCallback, useState } from 'react';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';

export default function SendInput(props) {
    const { sendMessage, room, authUser } = props;
    const [text, setText] = useState("");
    const handleText = useCallback((event) => {
        setText(event.target.value);
    }, []);

    const handleMessageSending = () => {
        const message = {
            room,
            message: text,
            sender: authUser.id,
        }
        sendMessage(message);
        setText("");
    }

    const handleKeyUp = useCallback((event) => {
        const key = event.key.toLowerCase();
        if (key === 'enter') {
            event.preventDefault();
            handleMessageSending();
        }
    }, [text]);

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", borderRadius: "25px" }}
        >
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton> */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type a message..."
                inputProps={{ 'aria-label': 'type a message' }}
                value={text}
                onChange={handleText}
                onKeyDown={handleKeyUp}
            />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <AttachFileTwoToneIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                disabled={false}
                onClick={handleMessageSending}
            >
                <SendTwoToneIcon color={'primary'} />
            </IconButton>
        </Paper>
    );
}