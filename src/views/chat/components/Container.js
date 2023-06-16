import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActions, CardHeader, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendInput from './SendInput';
import { useSelector } from 'react-redux';
import { getCurrentChat } from '../../../store/slices/UserSlice';
import MessageWrapper from './MessageWrapper';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

export default function Container(props) {
    const { room, messages, sendMessage, authUser } = props;
    const currentChat = useSelector(getCurrentChat);
    return (
        <Card sx={{ minWidth: 345, minHeight: 600, background: "rgb(240 248 255)" }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={currentChat?.scontacts?.full_name || ""}
            />
            <Divider />
            <CardContent className='chat-content'>
                {room ?
                    <>
                        {messages?.messages?.length > 0
                            ?
                            <MessageWrapper messages={messages.messages} authUser={authUser} />
                            :
                            <>

                                {/* <Grid className='no-chat-div'>
                                <Typography className='no-chat-text' component="p">
                                    Haven't started the chat yet? Be first to message
                                </Typography>
                            </Grid> */}
                                <Stack spacing={2}>
                                    <LeftMessage key={1} message={{ message: "Hello" }} />
                                    <LeftMessage key={2} message={{ message: "Hi" }} />
                                    <LeftMessage key={3} message={{ message: "How are you" }} />
                                    <RightMessage key={4} message={{ message: "Hello" }} />
                                    <RightMessage key={5} message={{ message: "I'm fine, how about you ?" }} />
                                </Stack>
                            </>
                        }
                    </>
                    :
                    <>
                        {/* <Grid className='no-chat-div'>
                        <Typography className='no-chat-text' component="p">
                            Hello, please select contact to display chat
                        </Typography>
                    </Grid> */}
                        <Stack spacing={2}>
                            <LeftMessage key={1} message={"Hello"} />
                            <LeftMessage key={2} message={"Hi"} />
                            <LeftMessage key={3} message={"How are you"} />
                            <RightMessage key={4} message={"Hello"} />
                            <RightMessage key={5} message={"I'm fine, how about you ?"} />
                        </Stack>
                    </>
                }

            </CardContent>
            <CardActions className='chat-actions'>
                <SendInput sendMessage={sendMessage} room={room} authUser={authUser} />
            </CardActions>
        </Card >
    );
}