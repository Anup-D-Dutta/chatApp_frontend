

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/config';

// Inside this we will make the hook
const api = createApi({

    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api/v1/`,
        credentials: 'include',
    }),
    tagTypes: ['Chat', "User", 'Message'],

    // My chats
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: 'include'
            }),
            providesTags: ['Chat'],
        }),
        // For search user
        searchUser: builder.query({
            query: (name) => ({
                url: `user/search/?name=${name}`,
                credentials: 'include',
            }),
            providesTags: ['User']
        }),
        // For SendRequest 
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/sendrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        // For notification
        getNotifications: builder.query({
            query: () => ({
                url: `user/notifications`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 0,
        }),
        // For accept Friend Request
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "user/acceptrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ['Chat'],
        }),
        chatDetails: builder.query({
            query: ({ name, chatId, populate = false }) => {

                let url = `chat/${name || chatId}`;
                if (populate) url += '?populate=true';

                return {
                    url,
                    credentials: "include"
                }
            },
            providesTags: ["Chat"],
        }),

        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chat/message/${chatId}?page=${page}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: `chat/message`,
                method: 'POST',
                credentials: "include",
                body: data
            }),
        }),

        

        availableFriends: builder.query({
            query: (chatId) => {

                let url = `user/friends`;
                if (chatId) url += `?chatId=${chatId}`;

                return {
                    url,
                    credentials: "include"
                }
            },
            providesTags: ["Chat"],
        }),

        newGroup: builder.mutation({
            query: ({name, members}) => ({
                url: "chat/new",
                method: 'POST',
                credentials: "include",
                body: {name, members}
            }),
            invalidatesTags: ['Chat']
        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['Chat']
        }),
        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['Chat']
        }),


    })

});

export default api;
export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
} = api;

