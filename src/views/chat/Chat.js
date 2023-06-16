import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Grid } from '@mui/material';
import '../../assets/chat.css';
import Container from './components/Container';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { useParams } from 'react-router-dom';
import { allContacts, getMessages, setCurrentChat, setMessages } from '../../store/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from '../../utils/Authenticate';
import { getUserMessages } from '../../store/actions/userActions';

export default function Chat() {
    const { room } = useParams();
    const dispatch = useDispatch();
    const allMessages = useSelector(getMessages);
    const [socketUrl, setSocketUrl] = useState(null);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const Authenticate = new Authentication();
    const handleSendMessage = useCallback((message) => {
        sendMessage(JSON.stringify(message));
    }, []);

    useEffect(() => {
        if (lastMessage?.data) {
            console.log(JSON?.parse(lastMessage?.data));
            const message = JSON?.parse(lastMessage?.data);
            const newSet = { ...allMessages, messages: allMessages.messages.concat(message.message) };
            dispatch(setMessages(newSet));
        }
    }, [lastMessage]);

    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName("chat-content")[0].scrollTop = document.getElementsByClassName("chat-content")[0].scrollHeight;
        }, 1000);
    }, [allContacts])

    const handleClickChangeSocketUrl = useCallback(
        (roomId) => setSocketUrl(`ws://localhost:4002/ws/${roomId}`),
        []
    )


    useEffect(() => {
        room && dispatch(getUserMessages({ room }));
        room && handleClickChangeSocketUrl(room);
    }, [room]);

    useEffect(() => {
        return () => {
            dispatch(setCurrentChat(null));
        }
    }, [])

    return (
        <>
            <Grid item md={4}>
                <Sidebar activeRoom={room} initiateSocket={handleClickChangeSocketUrl} authUser={Authenticate.getUser()} />
            </Grid>
            <Grid item md={8}>
                <Container room={room} sendMessage={handleSendMessage} messages={allMessages} authUser={Authenticate.getUser()} />
            </Grid>
        </>

    );
}