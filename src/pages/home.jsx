import ChatList from '../components/specific/ChatList';
import AppLayout from '../components/layout/AppLayout';
import { assets } from '../assets/assets';
import { useSelector } from 'react-redux';


const home = (props) => {
  const {
    data,
    chatId,
    handleDeleteChat,
    onlineUsers
  } = props;

  // Get newMessagesAlert from Redux
  const newMessagesAlert = useSelector(state => state.chat.newMessageAlert);

  return (
    <div className="w-full h-full flex flex-col">

      {/* Large screen message */}
      <div className="hidden sm:flex w-full h-full bg-black/90 text-white backdrop-blur-sm flex-col items-center justify-center gap-2">
        <img
          src={assets.chat_icon2}
          alt="logo"
          className="w-12 md:w-15 filter invert-[15%] sepia-0 saturate-[107%] hue-rotate-[130deg] brightness-[95%] contrast-[80%]"
        />
        <h5 className="text-2xl text-center text-gray-400 ">Select a Friend to Chat</h5>
      </div>


      {/* Small screen Chat List (same as AppLayout's Drawer ChatList) */}
      <div className="sm:hidden w-full h-full">
        {Array.isArray(data?.chats) && data.chats.length > 0 ? (
          <ChatList
            chats={data.chats}
            chatId={chatId}
            handleDeleteChat={handleDeleteChat}
            color="black"
            newMessagesAlert={newMessagesAlert}
            onlineUsers={onlineUsers}
            w="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <h5 className="text-xl text-center">No users found</h5>
          </div>
        )}

      </div>
    </div>
  );
};

export default AppLayout()(home);
