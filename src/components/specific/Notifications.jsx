import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';
import { useErrors } from '../../hooks/hook';

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptRequest({ requestId: _id, accept });

      dispatch(setIsNotification(false));

      if (res.data?.success) {
        console.log("Use SocketHere");
        toast.success(res.data.message);
      } else if (!res.data?.success) {
        console.log("Use SocketHere");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const closeHandler = () => dispatch(setIsNotification(false));
  useErrors([{ error, isError }]);

  return (
    <>
      {isNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md text-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto relative border border-white/20">
            <button
              onClick={closeHandler}
              className="absolute top-2 right-2 text-white hover:text-gray-300 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center mb-4">Notifications</h2>

            {isLoading ? (
              <div className="w-full h-6 bg-white/30 rounded animate-pulse"></div>
            ) : (
              <div className="space-y-4">
                {data?.allRequest?.length > 0 ? (
                  data?.allRequest.map(({ sender, _id }) => (
                    <NotificationItem
                      key={_id}
                      sender={sender}
                      _id={_id}
                      handler={friendRequestHandler}
                    />
                  ))
                ) : (
                  <p className="text-center text-white">0 Notifications</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <div className="flex items-center space-x-4 p-3 rounded-md  ">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="flex-grow truncate">{name}</p>
      <div className="flex flex-row gap-2 sm:gap-1">
        <button
          onClick={() => handler({ _id, accept: true })}
          className="px-3 py-1  text-green-400 rounded border-white/20 hover:bg-border-green-500 text-sm cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={() => handler({ _id, accept: false })}
          className="px-3 py-1 text-red-500 rounded cursor-pointer text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
});

export default Notifications;
