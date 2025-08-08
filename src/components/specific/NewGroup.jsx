import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import { useInputValidation } from '6pp';
import UserItem from '../Shared/UserItem';

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const submitHandler = async () => {
    if (!groupName.value) {
      toast.error('Group name is required');
      return;
    }
    if (selectedMembers.length < 2) {
      toast.error('Please select at least 3 members');
      return;
    }

    newGroup("Creating New Group", { name: groupName.value, members: selectedMembers });
  };

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  useErrors([{ error, isError }]);

  return (
    <>
      {isNewGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md text-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[85vh] overflow-y-auto relative border border-white/20">
            {/* Close button */}
            <button
              onClick={closeHandler}
              className="absolute top-2 right-3 text-white hover:text-gray-300 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">New Group</h2>

            {/* Group Name Input */}
            <div className="mb-4">
              <label htmlFor="group-name" className="block mb-2 text-white">
                Group Name
              </label>
              <input
                id="group-name"
                type="text"
                value={groupName.value}
                onChange={groupName.changeHandler}
                placeholder="Enter group name"
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Members */}
            <div className="mb-2">
              <h3 className="text-white text-lg mb-2">Members</h3>
              <div className="space-y-2">
                {isLoading ? (
                  <div className="w-full h-6 bg-white/30 rounded animate-pulse"></div>
                ) : (
                  data?.friends?.map((friend) => (
                    <UserItem
                      user={friend}
                      key={friend._id}
                      handler={selectMemberHandler}
                      isAdded={selectedMembers.includes(friend._id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeHandler}
                className="px-6 py-2 rounded text-red-500 hover:text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={submitHandler}
                disabled={isLoadingNewGroup}
                className="px-6 py-2 rounded text-blue-700 hover:text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewGroup;
