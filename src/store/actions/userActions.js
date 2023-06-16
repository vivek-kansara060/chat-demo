import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";

export const getUsers = createAsyncThunk(
    "users",
    async () => {
        const response = await ApiService.get("users");
        return response.data;
    }
)

export const getContacts = createAsyncThunk(
    "contacts",
    async (payload) => {
        let search = payload?.search ? `?search=${payload?.search}` : '';
        const response = await ApiService.get(`/user/${payload.userId}/contacts${search}`);
        return response.data;
    }
)

export const getUserMessages = createAsyncThunk(
    "messages",
    async (params) => {
        const response = await ApiService.get(`get-messages/${params.room}`);
        return response.data;
    }
)