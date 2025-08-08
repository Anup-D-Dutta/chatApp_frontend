import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name = "Unknown Chat",
  _id,
  groupChat = false,
  sameSender,
  isOnline = false,
  newMessageAlert = {},
  index = 0,
  latestMessage = "",
  handleDeleteChat,
}) => {
  const isUnread = newMessageAlert?._id === _id && newMessageAlert?.count > 0;

  // Display latest message from either DB or new message alert
  const displayMessage =
    latestMessage?.trim()?.length > 0
      ? latestMessage
      : newMessageAlert?.latestMessage || "";

  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      aria-label={`Chat with ${name}`}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`flex items-center gap-4 p-4 rounded-lg relative transition-colors duration-200 ${
          sameSender ? "bg-neutral-800" : "hover:bg-neutral-700"
        }`}
      >
        {/* Avatar Section */}
        {groupChat ? (
          <div className="relative w-12 h-12">
            {avatar.length >= 2 ? (
              <>
                <img
                  src={avatar[0] || "/default-avatar.png"}
                  alt="Member 1"
                  className="absolute top-0 left-0 w-7 h-7 rounded-full border border-neutral-900 object-cover"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <img
                  src={avatar[1] || "/default-avatar.png"}
                  alt="Member 2"
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full border border-neutral-900 object-cover"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
              </>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-500">
                <span className="text-white text-lg">👥</span>
              </div>
            )}
          </div>
        ) : (
          <img
            src={avatar[0] || "/default-avatar.png"}
            alt={name}
            className="w-12 h-12 rounded-full bg-gray-500 object-cover"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        )}

        {/* Name + Latest Message */}
        <div className="flex flex-col overflow-hidden">
          <p
            className={`text-white text-sm truncate ${
              isUnread ? "font-bold" : "font-medium"
            }`}
          >
            {name}
          </p>
          <p className="text-xs text-gray-400 truncate">{displayMessage}</p>
        </div>

        {/* Online Status Indicator */}
        {isOnline && (
          <span className="absolute top-1/2 right-4 w-2.5 h-2.5 bg-green-500 rounded-full transform -translate-y-1/2"></span>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
