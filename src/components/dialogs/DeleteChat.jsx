import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { setIsDeleteChat } from '../../redux/reducers/misc';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';
import toast from 'react-hot-toast';
import { FaTrashAlt, FaSignOutAlt } from "react-icons/fa"; // Using Font Awesome for icons

const DeleteChat = ({ dispatch, deleteChatAnchor }) => {
    const navigate = useNavigate();
    const menuRef = useRef(null); // Ref for the menu div

    const { isDeleteChat, selectedDeleteChat } = useSelector((state) => state.misc);

    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const closeHandler = () => {
        dispatch(setIsDeleteChat(false));
        if (deleteChatAnchor.current) {
            deleteChatAnchor.current = null;
        }
    };

    const isGroup = selectedDeleteChat.groupChat;

    const leaveGroupHandler = () => {
        closeHandler();
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    };

    const deleteChatHandler = () => {
        closeHandler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    };

    useEffect(() => {
        if (deleteChatData || leaveGroupData) {
            navigate('/');
        }
    }, [deleteChatData, leaveGroupData, navigate]);

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the menu and outside the anchor element
            if (menuRef.current && !menuRef.current.contains(event.target) && deleteChatAnchor.current && !deleteChatAnchor.current.contains(event.target)) {
                closeHandler();
            }
        };

        if (isDeleteChat) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDeleteChat, deleteChatAnchor]);

    // State to hold calculated position
    const [menuStyle, setMenuStyle] = useState({});

    // Effect to calculate and set position when isDeleteChat or anchor changes
    useEffect(() => {
        const calculatePosition = () => {
            // Only calculate if both anchor and menu refs are available
            if (!deleteChatAnchor.current || !menuRef.current) return;

            const anchorRect = deleteChatAnchor.current.getBoundingClientRect();
            const menuWidth = menuRef.current.offsetWidth;
            const viewportWidth = window.innerWidth;

            // Default: align right edge of menu with right edge of anchor
            let leftPosition = anchorRect.right - menuWidth;

            // Adjust if it goes off the left edge of the viewport
            if (leftPosition < 0) {
                leftPosition = 0;
            }

            // Adjust if it goes off the right edge of the viewport
            if (leftPosition + menuWidth > viewportWidth) {
                leftPosition = viewportWidth - menuWidth;
                // Fallback for very small viewports where menu is wider than screen
                if (leftPosition < 0) leftPosition = 0;
            }

            setMenuStyle({
                top: anchorRect.bottom + 'px',
                left: leftPosition + 'px',
            });
        };

        if (isDeleteChat) {
            // Use setTimeout to ensure the menu div is rendered and menuRef.current is available
            const timer = setTimeout(calculatePosition, 0);
            window.addEventListener('resize', calculatePosition); // Recalculate on window resize

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', calculatePosition);
            };
        }
    }, [isDeleteChat, deleteChatAnchor.current]); // Dependencies: re-run when menu opens or anchor changes

    return (
        <>
            {isDeleteChat && (
                <div
                    ref={menuRef}
                    style={menuStyle} // Apply the calculated style
                    className="fixed z-50 p-2 rounded-lg shadow-xl backdrop-blur-md bg-black/90 bg-opacity-70 border "
                >
                    <div
                        className="flex items-center gap-2 p-2 cursor-pointer text-white hover:bg-gray-700 rounded-md transition-colors"
                        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
                    >
                        {isGroup ? (
                            <>
                                {/* <FaSignOutAlt className="text-lg" /> */}
                                <span className="text-sm font-semibold">Leave Group</span>
                            </>
                        ) : (
                            <>
                                {/* <FaTrashAlt className="text-lg" /> */}
                                <span className="text-sm font-semibold">Delete Chat</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteChat;
