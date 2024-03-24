import React from "react";
import UserAvatar from "./components/UserAvatar";
import CreateBroadcast from "./components/CreateBroadcast";

const Dashboard = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <UserAvatar />
      <div className="mt-20 text-red-500">
        <CreateBroadcast />
      </div>
    </div>
  );
};

export default Dashboard;
