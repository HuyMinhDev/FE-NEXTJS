import React from "react";
import { User } from "../interfaces/users";

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  console.log(">>>Check prop users: ", user);
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4 hover:shadow-lg transform hover:scale-105 duration-200 cursor-pointer">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">{user.phone}</p>
        <div className="mt-1 flex gap-2 text-sm">
          <span
            className={`px-2 py-0.5 rounded text-white ${
              user.gender === "Male" ? "bg-blue-500" : "bg-pink-500"
            }`}
          >
            {user.gender}
          </span>
          <button
            onClick={() => onDelete(Number(user.id))}
            className="text-white hover:bg-red-700 bg-red-500 px-2 py-1 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
