"use client";
import React, { useState } from "react";
import { type IconType } from "react-icons";
import { InstagramLogo } from "~/assets/instagram";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineInstagram,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { cn } from "~/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { api } from "~/utils/api";
import Image from "next/image";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { useUser } from "~/providers/AuthProvider";

export const Sidebar = () => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const { data } = api.auth.getProfile.useQuery();
  const { user } = useUser();
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
      onClick: () => router.push(`/profile/${user?.id || ""}`),
    },
  ];
  return (
    <>
      <div className="fixed bottom-0 left-0 flex w-full bg-white md:top-0 md:w-[--sidebarMd]  md:border-r md:p-4 lg:w-[--sidebarLg]">
        <div className="mx-auto flex w-full max-w-lg flex-row justify-between md:flex-col md:justify-normal">
          <InstagramLogo
            onClick={() => router.push("/")}
            width="100px"
            className="m-3 mb-8 hidden cursor-pointer pt-6 lg:block"
          />
          <AiOutlineInstagram
            size={"24px"}
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
      </div>
      <CreatePostModal
        isOpen={createPostModalOpen}
        handleClose={() => setCreatePostModalOpen(false)}
      />
    </>
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
      <div className="my-1 flex flex-row items-center gap-3 rounded-md p-3 hover:bg-gray-50">
        <Icon size={"24px"} />
        <h2
          className={cn(
            "hidden lg:block",
            selected ? "font-bold" : "font-normal"
          )}
        >
          {text}
        </h2>
      </div>
    </button>
  );
};
