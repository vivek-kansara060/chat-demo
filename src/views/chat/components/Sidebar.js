import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import ContactSearch from './ContactSearch';
import { useDispatch, useSelector } from 'react-redux';
import { allContacts, contactRequests, isPending, setCurrentChat, userContacts } from '../../../store/slices/UserSlice';
import { Grid, IconButton } from '@mui/material';
import ApiService from '../../../services/ApiService';
import { REQUEST_STATUS } from '../../../utils/constant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { useNavigate } from 'react-router-dom';
import { getContacts } from '../../../store/actions/userActions';


const cts = [
    {
        scontacts: {
            id: 1,
            first_name: 'Mitul',
            last_name: 'Vala',
        },
        user_room: { room: 12 },
        request: "sent"
    },
    {
        scontacts: {
            id: 2,
            first_name: 'Vivek',
            last_name: 'kansara',
        },
        user_room: { room: 13 },
        request: "sent"
    }
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '10px',
    padding: '18px 10px',
}));
export default function Sidebar(props) {
    const { activeRoom, initiateSocket, authUser } = props;
    const contacts = useSelector(userContacts);
    // const contacts = cts;
    const allOtherContacts = useSelector(allContacts);
    const requests = useSelector(contactRequests);
    const dispatch = useDispatch();
    const isLoading = useSelector(isPending);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = useCallback(() => {
        getChatContacts();
    }, [search]);

    const handleSearchData = useCallback((value) => {
        setSearch(value)
    }, []);

    const sendRequest = async (requestedUserId) => {
        await ApiService.post('create-contact', { from: authUser.id, to: requestedUserId });
        getChatContacts();
    }

    const cancelRequest = useCallback(async (requestedUserId) => {
        await ApiService.post('cancel-request', { requested_by: authUser.id, requested_contact: requestedUserId });
        getChatContacts();
    }, []);

    const requestActions = useCallback(async (requestId, action) => {
        await ApiService.post('request-action', { request_id: requestId, action });
        getChatContacts();
    })

    const getChatContacts = useCallback(() => {
        dispatch(getContacts({ userId: authUser?.id, search }));
    }, [search]);

    const handleContactSelection = useCallback(async (user) => {
        initiateSocket(`${user.user_room.room}${user.scontacts.id}`);
        await dispatch(setCurrentChat(user));
        navigate(`/chat/${user.user_room.room}${user.scontacts.id}`)
    }, []);

    const handleCurrentChat = useCallback(() => {
        if (activeRoom) {
            const chat = contacts?.find(user => user.user_room.room === activeRoom);
            dispatch(setCurrentChat(chat));
        }
    }, [contacts]);

    useEffect(() => {
        getChatContacts();
    }, []);

    useEffect(() => {
        contacts?.length > 0 && handleCurrentChat();
    }, [contacts]);

    return (
        <Card sx={{ minWidth: 345, minHeight: 629 }}>
            <CardContent>
                <Stack spacing={2}>
                    <ContactSearch search={handleSearchData} handleSearch={handleSearch} />
                    {contacts?.map(user => {
                        const { scontacts, request, user_room } = user;
                        return (
                            <Item
                                key={scontacts.id}
                                className={`chat-sidebar-item cursor-pointer ${activeRoom === user_room?.room ? 'active' : ''}`}
                                onClick={() => handleContactSelection(user)}
                            >
                                <Avatar sx={{ bgColor: red[500] }} aria-label="recipe">
                                    I
                                </Avatar>
                                <Typography> {`${scontacts.first_name} ${user.scontacts.last_name}`}</Typography>
                                <Grid sx={{ position: 'relative', right: '-25%' }}>
                                    {REQUEST_STATUS.SENT === request &&
                                        <IconButton aria-label="share"
                                            onClick={() => cancelRequest(scontacts.id)}
                                            color="primary"
                                        >
                                            <PersonAddDisabledIcon />
                                        </IconButton>
                                    }
                                </Grid>
                            </Item>
                        )
                    })}
                    {allOtherContacts?.map(user => (
                        <Item key={user.id} className='chat-sidebar-item'>
                            <Avatar sx={{ bgColor: red[500] }} aria-label="recipe">
                                I
                            </Avatar>
                            <Typography> {`${user.first_name} ${user.last_name}`}</Typography>
                            <Grid sx={{ position: 'relative', right: '-25%' }}>
                                <IconButton aria-label="share"
                                    onClick={() => sendRequest(user.id)}
                                    color="primary"
                                >
                                    <PersonAddIcon />
                                </IconButton>
                            </Grid>
                        </Item>
                    ))}
                    {requests?.map(user => {
                        const { rcontacts, id } = user;
                        return (
                            <Item key={rcontacts.id} className='chat-sidebar-item'>
                                <Avatar sx={{ bgColor: red[500] }} aria-label="recipe">
                                    I
                                </Avatar>
                                <Typography> {`${rcontacts.first_name} ${rcontacts.last_name}`}</Typography>
                                <Grid sx={{ position: 'relative', right: '-25%' }}>
                                    <IconButton aria-label="share"
                                        onClick={() => requestActions(id, REQUEST_STATUS.ACCEPTED)}
                                        color="success"
                                    >
                                        <CheckCircleIcon />
                                    </IconButton>
                                    <IconButton aria-label="share" color='error' onClick={() => requestActions(id, REQUEST_STATUS.REJECTED)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Grid>
                            </Item>
                        )
                    })}
                </Stack>
            </CardContent>
        </Card >
    );
}