import React from 'react';
import { BsThreeDotsVertical, BsArrowLeft, BsPeopleFill } from "react-icons/bs";

const ChatHeader = ({
  avatar = '/default-avatar.png',
  name = 'Unknown User',
  chatId,
  groupChat, // This prop is used to determine if it's a group chat
  handleDeleteChat,
  handleBack
}) => {
  return (
    <div className='flex w-full h-16 items-center justify-between px-4 shadow rounded-b-lg'>
      <div className='flex items-center gap-3'>
        <button
          className='sm:hidden flex bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-gray-700 transition-colors'
          onClick={handleBack}
        >
          <BsArrowLeft className='text-white text-xl' />
        </button>

        {groupChat ? (
          <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 border border-neutral-900 shadow-md'>
            <BsPeopleFill className='text-white text-2xl' />
          </div>
        ) : (
          <img
            src={avatar}
            alt={name}
            className='w-10 h-10 rounded-full object-cover bg-gray-500 border border-neutral-900 shadow-md'
            onError={e => (e.target.src = '/default-avatar.png')}
          />
        )}
        <h2 className='text-white text-lg'>{name}</h2>
      </div>

      <button
        className='bg-transparent border-none cursor-pointer p-2 rounded-full hover:bg-gray-700 transition-colors'
        onClick={(e) => handleDeleteChat(e, chatId, groupChat)}
      >
        <BsThreeDotsVertical className='text-white text-xl' />
      </button>
    </div>
  );
};

export default ChatHeader;