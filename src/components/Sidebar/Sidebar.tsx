"use client";
import React, { useState } from "react";
import { type IconType } from "react-icons";
import { InstagramLogo } from "~/assets/instagram";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlinePlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { cn } from "~/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { api } from "~/utils/api";
import Image from "next/image";

export const Sidebar = () => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const { data } = api.auth.getProfile.useQuery();
  const router = useRouter();
  const pathname = usePathname();

  const sidebarElements = [
    {
      icon: AiOutlineHome,
      text: "Home",
      selected: pathname === "/",
      onClick: () => router.push("/"),
    },
    {
      icon: AiOutlineSearch,
      text: "Search",
      selected: pathname === "/search",
      onClick: () => router.push("/search"),
    },
    {
      icon: BsSend,
      text: "Messages",
      selected: pathname === "/messages",
      onClick: () => router.push("/messages"),
    },
    {
      icon: AiOutlineHeart,
      text: "Notifications",
      selected: pathname === "/notifications",
      onClick: () => router.push("/notifications"),
    },
    {
      icon: AiOutlinePlusCircle,
      text: "Create",
      selected: false,
      onClick: () => setCreatePostModalOpen(true),
    },
    {
      icon: () => (
        <Image
          alt="Avatar"
          src={data?.avatarUrl || ""}
          width={25}
          height={25}
          className={cn("rounded-full")}
        />
      ),
      text: "Profile",
      selected: pathname === "/profile",
      onClick: () => router.push("/profile"),
    },
  ];
  return (
    <div className="flex w-full flex-row justify-between px-4 py-4 md:w-[80px] md:flex-col md:justify-normal lg:w-[250px]">
      <InstagramLogo
        onClick={() => router.push("/")}
        width="100px"
        className="m-3 mb-8 hidden lg:block"
      />
      <AiOutlineInstagram
        size={"25px"}
        className="m-3 mb-8 hidden md:block lg:hidden"
      />
      {sidebarElements.map((element) => (
        <SidebarElement
          key={element.text}
          icon={element.icon}
          text={element.text}
          selected={element.selected}
          onClick={element.onClick}
        />
      ))}
    </div>
  );
};

const SidebarElement = ({
  icon: Icon,
  text,
  selected,
  onClick,
}: {
  icon: IconType;
  text: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <div className="flex flex-row items-center gap-3 p-3">
        <Icon size={"25px"} />
        <h2
          className={cn(
            "hidden text-lg lg:block",
            selected ? "font-bold" : "font-medium"
          )}
        >
          {text}
        </h2>
      </div>
    </button>
  );
};
