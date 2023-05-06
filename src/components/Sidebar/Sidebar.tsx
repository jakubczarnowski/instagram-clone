import React from "react";
import { type IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { InstagramLogo } from "~/assets/instagram";
import { AiOutlineInstagram } from "react-icons/ai";
export const Sidebar = () => {
  return (
    <div className="flex h-full w-full grow flex-row px-4 py-4 md:flex-col">
      <InstagramLogo width="100px" className="m-3 mb-8 hidden lg:block" />
      <AiOutlineInstagram size={"25px"} className="m-3 mb-8 block lg:hidden " />
      <SidebarElement icon={FaHome} text="Home" />
    </div>
  );
};

const SidebarElement = ({
  icon: Icon,
  text,
}: {
  icon: IconType;
  text: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-3 p-3">
      <Icon size={"25px"} />
      <h2 className="hidden text-lg font-medium lg:block">{text}</h2>
    </div>
  );
};
