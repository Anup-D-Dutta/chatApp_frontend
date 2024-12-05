import { Upload } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
import group from '../../pages/group';

const initialState = {
    isNewGroup: false,
    isAddMember:false,
    isNotification: false,
    isMobile: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteChat: false,
    uploadingLoader: false,
    selectedDeleteChat:{
        chatId: "",
        groupChat: false
    },
};

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsDeleteChat: (state, action) => {
            state.isDeleteChat = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        },

    },
})


export default miscSlice;
export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotification,
    setIsMobile,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteChat,
    setUploadingLoader,
    setSelectedDeleteChat
} = miscSlice.actions;
