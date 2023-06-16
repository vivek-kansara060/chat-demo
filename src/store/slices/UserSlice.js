import { createSlice } from "@reduxjs/toolkit";
import { getContacts, getUserMessages, getUsers } from "../actions/userActions";

const initialState = {
    user: [],
    allContacts: [],
    userContacts: [],
    contactRequests: [],
    messages: [],
    currentChat: null,
    loading: false,
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        [getUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [getContacts.fulfilled]: (state, action) => {
            state.userContacts = action.payload.contacts;
            state.allContacts = action.payload.users;
            state.contactRequests = action.payload.requests;
        },
        [getContacts.pending]: (state, action) => {
            state.loading = action.payload;
        },
        [getUserMessages.fulfilled]: (state, action) => {
            state.messages = action.payload;
        }
    },
});

export const userDetails = ({ user }) => user.user;
export const userContacts = ({ user }) => user.userContacts;
export const allContacts = ({ user }) => user.allContacts;
export const contactRequests = ({ user }) => user.contactRequests;
export const getMessages = ({ user }) => user.messages;
export const isPending = ({ user }) => user.loading;
export const getCurrentChat = ({ user }) => user.currentChat;

export const { setCurrentChat, setMessages } = UserSlice.actions;
export default UserSlice.reducer;