import React from "react";
import AppLayout from "components/layouts/AppLayout";
import GuildList from "components/layouts/guild/GuildList";
import FilesDashboard from "components/layouts/home/dashboard/FilesDashboard";
import Sidebar from "components/layouts/home/Sidebar";

export default function Home() {
  return (
    <AppLayout>
      <GuildList />
      <Sidebar />
      <FilesDashboard />
    </AppLayout>
  );
}
