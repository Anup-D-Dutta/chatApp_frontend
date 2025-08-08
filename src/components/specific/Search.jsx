import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setIsSearch } from '../../redux/reducers/misc';
import { useInputValidation } from '6pp';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { useAsyncMutation } from '../../hooks/hook';
import UserItem from '../Shared/UserItem';
import {
  HiOutlineSearch,
} from 'react-icons/hi';

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const search = useInputValidation('');
  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <>
      {isSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md text-white rounded-lg shadow-lg border border-white/20 max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={searchCloseHandler}
              className="absolute top-2 right-3 text-white hover:text-gray-300 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Find People</h2>

            {/* Search Input */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white text-sm">
                <HiOutlineSearch />
              </span>
              <input
                type="text"
                value={search.value}
                onChange={search.changeHandler}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/80 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Results List */}
            <div className="space-y-3">
              {users.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
