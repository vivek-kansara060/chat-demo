import React from 'react';
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import ErrorPage from '../error-page';
import Login from '../views/authentication/Login';
import Chat from '../views/chat/Chat';
import Layout from '../views/layout/Layout';

const FrontRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        // loader: true,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: <Layout />,
        // loader: true,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'chat',
                element: <Chat />,
            },
            {
                path: 'chat/:room',
                element: <Chat />,
            }
        ],
    },
    // {
    //     path: '/login',
    //     element: <Login />,
    //     loader: async ({ params }) => {
    //         return fetch(`/api/teams/${params.teamId}.json`);
    //     },
    //     errorElement: <ErrorPage />,
    // }
]);

export default FrontRoutes;