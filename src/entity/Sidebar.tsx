import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export type SidebarItem = {
  id: string;
  title: string;
  link: string;
  icon: React.ReactNode;
};

export const SidebarItems: SidebarItem[] = [
  { id: `0`, title: "ホーム", link: "/", icon: <HomeIcon /> },
  {
    id: `1`,
    title: "友達を追加する",
    link: "/addfriend",
    icon: <PersonAddIcon />,
  },
];
