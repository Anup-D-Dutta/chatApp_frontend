import React from 'react';
import { FaUser, FaAt, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { transformImage } from '../../lib/Features';

const Profile = ({ user }) => {
  return (
    <div
      className="flex flex-col items-center gap-8 p-8 rounded-xl border border-[#1F1F1F] bg-black/10 backdrop-blur-md h-full"
    >
      <img
        src={transformImage(user?.avatar?.url)}
        alt="User Avatar"
        className="w-52 h-52 rounded-full border-4 border-white object-cover mb-4"
      />

      <ProfileCard heading="Bio" text={user?.bio || "No bio"} />
      <ProfileCard heading="Username" text={user?.username} Icon={<FaAt />} />
      <ProfileCard heading="Name" text={user?.name} Icon={<FaUser />} />
      <ProfileCard heading="Joined" text={moment(user?.createdAt).fromNow()} Icon={<FaCalendarAlt />} />
    </div>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <div className="flex items-center text-white text-center gap-4">
    {Icon && <div className="text-lg">{Icon}</div>}

    <div className="text-left">
      <p className="text-base">{text}</p>
      <p className="text-gray-400 text-sm">{heading}</p>
    </div>
  </div>
);

export default Profile;
