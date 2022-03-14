import React from "react";
import AppLayout from "../components/layouts/AppLayout";
import Sidebar from "../components/layouts/home/Sidebar";
import GuildList from "../components/layouts/guild/GuildList";
import UsersDashboard from "../components/layouts/home/dashboard/UsersDashboard";

const Users = () => {
  return (
    <AppLayout>
      <GuildList />
      <Sidebar />
      <UsersDashboard />
    </AppLayout>
  );
};

export default Users;
